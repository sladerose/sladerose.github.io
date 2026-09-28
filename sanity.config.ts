import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Slade Rose Content Studio',

  // TODO(step 7, RESUME.md): placeholder until `sanity login` + new personal
  // project/dataset are created. Never point this at Athenium's `sofrjamf`.
  // Must stay lowercase-alphanumeric-dash — Sanity's client rejects anything
  // else even as an unused placeholder.
  projectId: 'placeholder',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
