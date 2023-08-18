module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'jsdoc',
    'prefer-arrow',
    'prettier',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    "plugin:import/typescript",
    'plugin:jsdoc/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // Agrega tus reglas personalizadas aquí
  },
  settings: {
    "import/resolver": {
      typescript: {},
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['node_modules', 'src/'],
      }
    }
  },
};