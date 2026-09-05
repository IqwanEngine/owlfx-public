import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

// Plugin untuk mengendalikan Clean URLs (Tanpa .html) di Dev Server
const cleanUrlsPlugin = (): Plugin => ({
  name: 'clean-urls',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const url = req.url?.split('?')[0] || '';
      
      // Mapping URL bersih ke fail HTML fizikal
      const rewrites: Record<string, string> = {
        '/interested': '/interested/index.html',
        '/my/ib_development': '/my/ib_development/index.html',
        '/id/ib_development': '/id/ib_development/index.html',
        '/my/register': '/my/register/index.html',
        '/id/register': '/id/register/index.html',
        '/masterclass_registration': '/masterclass_registration/index.html',
        '/maintenance': '/maintenance/index.html',
      };

      if (rewrites[url]) {
        req.url = rewrites[url] + (req.url?.includes('?') ? '?' + req.url.split('?')[1] : '');
      }
      next();
    });
  },
});

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cleanUrlsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          interested: path.resolve(__dirname, 'interested/index.html'),
          my_ib: path.resolve(__dirname, 'my/ib_development/index.html'),
          id_ib: path.resolve(__dirname, 'id/ib_development/index.html'),
          my_reg: path.resolve(__dirname, 'my/register/index.html'),
          id_reg: path.resolve(__dirname, 'id/register/index.html'),
          masterclass: path.resolve(__dirname, 'masterclass_registration/index.html'),
          maintenance: path.resolve(__dirname, 'maintenance/index.html'),
        },
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'lucide': ['lucide-react'],
          },
        },
      },
    },
  };
});
