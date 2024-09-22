import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		prerender: {
			crawl: true,
			entries: [
				'*',
				'/',
				'/projects/yorishiro',
				'/projects/monograph',
				'/projects/binary',
				'/projects/neiro',
				'/projects/archive'
			]
		},
		alias: {
			'@/*': './src/*'
		}
	}
};

export default config;
