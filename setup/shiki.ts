import { defineShikiSetup } from '@slidev/types'

// Couleurs de code bien contrastées dans les deux thèmes, et à l'export PDF.
// Les thèmes par défaut de Slidev (vitesse) sont trop pâles en clair.
export default defineShikiSetup(() => {
  return {
    themes: {
      dark: 'github-dark',
      light: 'github-light',
    },
  }
})
