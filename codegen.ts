import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:3003/graphql',
  documents: ['**/*.graphql'],
  generates: {
    './graphql/generated/introspection.json': {
      plugins: ['introspection'],
    },
    './graphql/generated/operation.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
    },
  },
};
export default config;
