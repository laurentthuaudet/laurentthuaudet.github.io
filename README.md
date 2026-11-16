# CV interactif — Laurent Thuaudet

CV en HTML accessible sur fond de plongée sous-marine 3D (Vite, React, React Three Fiber),
stylé avec le système de design Caretta.

## Développement

```bash
pnpm install
pnpm dev
```

- Contenu du CV : `src/data/cv.ts`
- Jetons Caretta : `src/styles/tokens.css`
- Scène 3D : `src/scene/` (assemblée dans `Scene.tsx`)

## Mise en ligne (GitHub Pages)

Chaque push sur `main` lance `.github/workflows/deploy.yml` (lint, build, déploiement).

1. Créer le repo sur GitHub. Nommé `laurentthuaudet.github.io`, le site est servi à la racine ;
   sous un autre nom (par ex. `cv`), il l'est sous `/cv/`.
2. Dans le repo : **Settings → Pages → Source : GitHub Actions**.
3. Ajouter le remote et pousser :

   ```bash
   git remote add origin git@github.com:laurentthuaudet/<repo>.git
   git push -u origin main
   ```
