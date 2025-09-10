// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'class',
	content: [
		'./components/**/*.{vue,js,ts}',
		'./layouts/**/*.{vue,js,ts}',
		'./pages/**/*.{vue,js,ts}',
		'./app.vue',
		'./plugins/**/*.{js,ts}',
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
export default config;
