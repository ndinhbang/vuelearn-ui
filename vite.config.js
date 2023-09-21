import {defineConfig, loadEnv, splitVendorChunkPlugin} from 'vite'
import mkcert from 'vite-plugin-mkcert'
import {fileURLToPath, URL} from 'node:url'
import dns from 'node:dns'
import process from 'node:process'
import vue from '@vitejs/plugin-vue'
// @see: https://vitejs.dev/config/server-options.html#server-host
dns.setDefaultResultOrder('verbatim')

// https://vitejs.dev/config/
export default defineConfig(({command, mode, ssrBuild}) => {
    // load .env
    const env = loadEnv(mode, process.cwd(), '')
    const domain = new URL(env.VITE_APP_URL || 'app.reactlearn.test')

    return {
        plugins: [
            mkcert({
                source: 'coding',
            }),
            vue(),
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            host: domain.hostname,
            https: true,
            strictPort: true
        }
    }
})
