// Usage : node check-layout.cjs dist/diapo-1 [nombre de slides]
// Le nombre de slides est détecté tout seul s'il n'est pas donné.
const http=require("http"),fs=require("fs"),path=require("path");
const {chromium}=require("playwright-chromium");
const DIST=process.argv[2]||"dist", FORCED=Number(process.argv[3]||0);
const MIME={".html":"text/html",".js":"text/javascript",".css":"text/css",".json":"application/json",".svg":"image/svg+xml",".woff2":"font/woff2",".png":"image/png",".jpg":"image/jpeg",".ico":"image/x-icon"};
const server=http.createServer((req,res)=>{let p=decodeURIComponent(req.url.split("?")[0]);let f=path.join(DIST,p);
 if(!fs.existsSync(f)||fs.statSync(f).isDirectory())f=path.join(DIST,"index.html");
 res.writeHead(200,{"Content-Type":MIME[path.extname(f)]||"application/octet-stream"});res.end(fs.readFileSync(f));});

const measure=(N)=>{
  const page=document.querySelector(".slidev-page-"+N);
  if(!page) return null;
  const layout=page.querySelector(".slidev-layout")||page;
  const rect=layout.getBoundingClientRect();
  const scale=layout.offsetHeight? rect.height/layout.offsetHeight : 1;
  const cs=getComputedStyle(layout);
  const limit=rect.bottom-(parseFloat(cs.paddingBottom)||0)*scale;
  const vis=(el)=>{let e=el;while(e&&e!==layout){if(e.classList&&e.classList.contains("slidev-vclick-hidden"))return false;
    const c=getComputedStyle(e); if(c.visibility==="hidden"||c.display==="none"||parseFloat(c.opacity)<0.05)return false; e=e.parentElement;} return true;};
  let worst=0,culprit="";
  const walk=(el)=>{for(const c of el.children){ if(c.tagName==="STYLE"||c.tagName==="SCRIPT")continue;
    const b=c.getBoundingClientRect();
    if(b.height>1&&b.width>1&&vis(c)&&!c.closest(".abs-br")){const o=(b.bottom-limit)/scale;
      if(o>worst){worst=o;culprit=c.tagName.toLowerCase()+(typeof c.className==="string"&&c.className?"."+c.className.split(" ").filter(Boolean).filter(x=>!x.startsWith("slidev-vclick")).slice(0,2).join("."):"")+" «"+(c.textContent||"").replace(/\s+/g," ").trim().slice(0,40)+"»";}}
    walk(c);}};
  walk(layout);
  const gaps=[];
  const boxes=[...layout.querySelectorAll(".box")].filter(e=>e.getBoundingClientRect().height>1&&vis(e));
  for(let i=0;i<boxes.length;i++)for(let j=0;j<boxes.length;j++){
    if(i===j||boxes[i].contains(boxes[j])||boxes[j].contains(boxes[i]))continue;
    const a=boxes[i].getBoundingClientRect(),b=boxes[j].getBoundingClientRect();
    if(Math.abs(a.left-b.left)<4&&Math.abs(a.width-b.width)<4&&b.top>=a.bottom-0.5){
      const g=(b.top-a.bottom)/scale;
      if(g<10)gaps.push("V "+g.toFixed(0)+"px : «"+(boxes[i].textContent||"").replace(/\s+/g," ").trim().slice(0,26)+"» / «"+(boxes[j].textContent||"").replace(/\s+/g," ").trim().slice(0,26)+"»");}
  }
  let overW=0;
  for(const p of layout.querySelectorAll("pre, .slidev-code, table, .term")){ if(!vis(p))continue; const o=p.scrollWidth-p.clientWidth; if(o>overW)overW=o; }
  return {worst:Math.round(worst),culprit,gaps,overW:Math.round(overW)};
};

(async()=>{
 await new Promise(r=>server.listen(4321,r));
 const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1600,height:900}});
 let LAST=FORCED;
 if(!LAST){
   // On avance jusqu'à la première slide qui n'existe pas
   for(let n=1;n<=300;n++){
     await pg.goto(`http://localhost:4321/${n}`,{waitUntil:"networkidle"});
     await pg.waitForTimeout(120);
     if(!(await pg.$(".slidev-page-"+n)))break;
     LAST=n;
   }
   if(!LAST){console.log("Aucune slide trouvée dans "+DIST);process.exit(1);}
 }
 console.log(DIST+" · "+LAST+" slides\n");
 const rows=[];
 for(let n=1;n<=LAST;n++){
   await pg.goto(`http://localhost:4321/${n}?clicks=99`,{waitUntil:"networkidle"});
   await pg.waitForTimeout(180);
   const max=Number(new URL(pg.url()).searchParams.get("clicks")||0);
   for(let c=0;c<=max;c++){
     await pg.goto(`http://localhost:4321/${n}?clicks=${c}`,{waitUntil:"networkidle"});
     await pg.waitForTimeout(140);
     const r=await pg.evaluate(measure,n); if(r)rows.push({n,c,max,...r});
   }
 }
 await b.close();server.close();
 console.log("=== DEBORDEMENTS VISIBLES (px sous le bord) ===");
 const bad={}; for(const r of rows) if(r.worst>3&&(!bad[r.n]||bad[r.n].worst<r.worst)) bad[r.n]=r;
 const ks=Object.keys(bad).map(Number).sort((a,b)=>bad[b].worst-bad[a].worst);
 if(!ks.length)console.log("aucun");
 for(const k of ks)console.log(`slide ${k} · clic ${bad[k].c}/${bad[k].max} · +${bad[k].worst}px · ${bad[k].culprit}`);
 console.log("\n=== CODE QUI DEBORDE EN LARGEUR ===");
 const w={}; for(const r of rows) if(r.overW>2&&(!w[r.n]||w[r.n].overW<r.overW)) w[r.n]=r;
 const wk=Object.keys(w).map(Number).sort((a,b)=>w[b].overW-w[a].overW);
 if(!wk.length)console.log("aucun");
 for(const k of wk)console.log(`slide ${k} · clic ${w[k].c} · +${w[k].overW}px`);
 console.log("\n=== BOITES COLLEES (visibles, < 10px) ===");
 const seen=new Set(); let any=false;
 for(const r of rows)for(const g of r.gaps){const k=r.n+g;if(seen.has(k))continue;seen.add(k);any=true;console.log(`slide ${r.n} · clic ${r.c}/${r.max} · ${g}`);}
 if(!any)console.log("aucune");
})();
