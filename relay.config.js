module.exports = {
  src: './src',
  schema: './src/data/schema.graphql',
  exclude: ['**/node_modules/**', '**/__generated__/**'],
  language: 'typescript',
  artifactDirectory: 'src/queries/__generated__',
};
