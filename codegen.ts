import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_URL,
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
