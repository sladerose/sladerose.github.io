import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Slade Rose Content Studio',

  // TODO(step 7, RESUME.md): placeholder until `sanity login` + new personal
  // project/dataset are created. Never point this at Athenium's `sofrjamf`.
  projectId: 'REPLACE_ME',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
