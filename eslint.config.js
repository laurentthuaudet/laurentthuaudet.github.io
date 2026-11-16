import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, reactHooks.configs.flat.recommended],
    languageOptions: { ecmaVersion: 2022, globals: globals.browser },
  },
  {
    // R3F : les objets three.js (géométries, couleurs, uniforms) sont mutés dans useFrame
    // plutôt que recréés à chaque frame. C'est l'idiome voulu, pas un état React.
    files: ['src/scene/**/*.{ts,tsx}'],
    rules: { 'react-hooks/immutability': 'off' },
  },
);
