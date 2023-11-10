import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    // baseUrl: 'https://cinema-app-sigma.vercel.app',
    baseUrl: 'http://localhost:3000',
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
});
