// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    dark: 'class',
	theme: {
    	extend: {
    		colors: { 
				primary: '#ED6918',
				 secondary: '#FF6700', 
				 third: '#FF8C39', 
				 fourth: '#FF9900',
				 five: '#FEA71D', 
				 six: '#F2F2F2', 
				 seven: '#00B14B', 
				 eight: '#00913D', 
				 nine: '#007A3A'
    		},
    	},
    },
	plugins: [],
  }