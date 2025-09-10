export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	ssr: true,
	nitro: {
		preset: 'static',
	},
	app: {
		baseURL: '/vue-3-simple-form/', // 👈 VERY important for GitHub Pages
	},
	modules: ['@nuxtjs/tailwindcss'],
	devtools: { enabled: true },
	build: {
		transpile: ['@vuepic/vue-datepicker'],
	},
	components: [
		{
			path: '~/components',
			pathPrefix: false,
		},
	],
	css: ['@/assets/css/styles.css'],
});
