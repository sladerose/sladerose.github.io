import { defineConfig } from 'astro/config';
import sanity from '@sanity/astro';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  integrations: [sanity({
    // TODO(step 7, RESUME.md): placeholder until `sanity login` + new
    // personal project/dataset are created. Never point this at Athenium's
    // `sofrjamf` project. Must stay lowercase-alphanumeric-dash — Sanity's
    // client rejects anything else even as an unused placeholder.
    projectId: 'placeholder',
    dataset: 'production',
    useCdn: false, // Set to true for production if needed
    studioPath: '/admin', // The path where Sanity Studio will be hosted
  }), react()],

  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
  }),
});