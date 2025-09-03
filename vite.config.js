import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Polyfill Node.js globals and modules for browser
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';

export default defineConfig({
  plugins: [react()],
  base: '/',
  optimizeDeps: {
    exclude: ['viem'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
        }),
        NodeModulesPolyfillPlugin()
      ]
    }
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      stream: 'stream-browserify',
      process: 'process/browser'
      // Removed viem alias to avoid missing file errors
    },
  },
  define: {
    'process.env.NODE_ENV': '"development"'
  }
});
