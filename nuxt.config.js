module.exports = {
	mode: "spa",
	/*
	 ** Headers of the page
	 */
	head: {
		title: "EasyTask",
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				hid: "description",
				name: "description",
				content: process.env.npm_package_description || ""
			}
		],
		link: [
			{
				rel: "icon",
				type: "image/x-icon",
				href: "/favicon.ico"
			},
			{
				rel: "stylesheet",
				href: "https://use.fontawesome.com/releases/v5.8.1/css/all.css",
				integrity:
					"sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf",
				crossorigin: "anonymous"
			}
		]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: "#fff" },
	/*
	 ** Global CSS
	 */
	css: ["~/assets/css/style"],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{ src: "~/plugins/moment" },
		{ src: "~/plugins/filters" },
		{
			src: "~/plugins/vuex-persistedstate.js"
		}
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		"@nuxtjs/axios",
		"@nuxtjs/pwa"
	],
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {},
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {}
	}
};
