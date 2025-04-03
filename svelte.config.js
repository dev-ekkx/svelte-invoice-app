import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			$lib: '/src/lib',
			$components: '/src/lib/components',
			$utils: '/src/lib/utils',
			$interfaces: '/src/lib/interfaces',
			$assets: '/src/lib/assets'
		}
	}
};

export default config;
