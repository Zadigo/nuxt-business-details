import { defineConfig } from 'vitest/config'
// import { defineVitestProject } from '@nuxt/test-utils/config'
// import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  test: {
    exclude: [ '**/node_modules/**', '**/.nuxt/**', '**/.output/**' ],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: [ 'text', 'json', 'html' ]
    },
    env: {
      NODE_ENV: 'test'
    },
    // projects: [

    // ]
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    }
  }
})
