const path = require('path')
const {
	override,
	addDecoratorsLegacy,
	addWebpackAlias,
	addBundleVisualizer,
	addBabelPlugins,
	addWebpackExternals,
	addWebpackPlugin,
	getBabelLoader,
	fixBabelImports,
	adjustStyleLoaders,
	addWebpackResolve,
} = require('customize-cra')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
const glob = require('glob')
const _ = require('lodash')

//修改 环境变量
// process.env.PORT = 9000;
process.env.BROWSER = 'none' //devServer不自动打开浏览器
process.env.GENERATE_SOURCEMAP = false // 生成环境是否打包 Source Map
process.env.PUBLIC_URL = './'

const removePlugin = (plugins, name) => {
	const list = plugins.filter((it) => !(it.constructor && it.constructor.name && name === it.constructor.name))
	if (list.length === plugins.length) {
		throw new Error(`Can not found plugin: ${name}.`)
	}
	return list
}

const overrideGenerateSWConfig = (config, env) => {
	if (process.env.NODE_ENV === 'development') return config

	config.plugins = removePlugin(config.plugins, 'GenerateSW')
	config.plugins.push(
		new WorkboxWebpackPlugin.GenerateSW({
			cacheId: 'main-pwa',
			skipWaiting: true,
			clientsClaim: true,
			offlineGoogleAnalytics: true,
			swDest: 'service-worker.js',
			exclude: [/.*\.html/, /(asset-manifest|manifest)\.json$/, /.*\.(?:png|jpg|jpeg|svg|gif)/],
			runtimeCaching: [
				{
					urlPattern: /.*\.html/,
					handler: 'NetworkFirst',
				},
				{
					urlPattern: /(asset-manifest|manifest).json/,
					handler: 'NetworkFirst',
				},
				{
					urlPattern: /.*\.(?:png|jpg|jpeg|svg|gif)/,
					handler: 'CacheFirst',
					options: {
						cacheName: 'image-cache',
						expiration: {
							maxAgeSeconds: 24 * 60 * 60 * 7,
							maxEntries: 50,
						},
					},
				},
				// {
				//     urlPattern: /api/,
				//     handler: 'NetworkFirst',
				//     options: {
				//         cacheName: "api-cache"
				//     }
				// },
			],
		})
	)

	return config
}

// function getEntries() {
// 	//获取多入口的一级文件夹
// 	let files = glob
// 		.sync(path.join(__dirname, './src/pages/*'))
// 		.map((page) => page.substring(page.lastIndexOf('/') + 1))
// 	let entrys = {}, //设置多入口
// 		alias = {} //设置快捷路径

// 	const arrEntry =
// 		process.env.NODE_ENV === 'development' ? [require.resolve('react-dev-utils/webpackHotDevClient')] : []

// 	files.forEach((file) => {
// 		alias[`@${file}`] = path.join(__dirname, `./src/pages/${file}`)
// 	})

// 	files.forEach((file) => {
// 		entrys[file] = [...arrEntry, path.join(__dirname, `./src/pages/${file}/index`)]
// 	})

// 	return { files, entrys, alias }
// }

module.exports = {
	webpack: override(
		overrideGenerateSWConfig,
		...addBabelPlugins('styled-components', 'lodash'),

		fixBabelImports('lodash', {
			libraryName: 'lodash',
			libraryDirectory: '',
			camel2DashComponentName: false,
		}),

		// 配置路径别名
		addWebpackAlias({
			'@': path.join(__dirname, 'src'),
			// ...getEntries().alias,
		}),

		// 对Decorators支持
		addDecoratorsLegacy(),

		addWebpackPlugin(
			new LodashModuleReplacementPlugin({
				collections: true,
				paths: true,
			})
		),

		(config, env) => {
			if (process.env.NODE_ENV === 'production') {
				config.plugins = removePlugin(config.plugins, 'GenerateSW')

				// delete config.devtool
				// config.plugins.push(
				// 	new webpack.SourceMapDevToolPlugin({
				// 		filename: '[file].map',
				// 		moduleFilenameTemplate: (info) =>
				// 			path.relative('./src', info.absoluteResourcePath).replace(/\\/g, '/'),
				// 		append: '\n//# sourceMappingURL=sourcemap/[url]',
				// 	})
				// )
			}

			//多入口需要
			// if (process.env.NODE_ENV === 'development') {
			// 	config.output.filename = 'static/js/[name].[hash:8].js'
			// }

			config.resolve.plugins = removePlugin(config.resolve.plugins, 'ModuleScopePlugin')

			// const { files: entryFileNames, entrys } = getEntries()
			// config.entry = entrys

			// config.plugins = removePlugin(config.plugins, 'ManifestPlugin')
			// config.plugins.push(
			// 	new ManifestPlugin({
			// 		fileName: 'asset-manifest.json',
			// 		generate: (seed, files, entrypoints) => {
			// 			const manifestFiles = files.reduce((manifest, file) => {
			// 				if (!file.name.endsWith('.map')) {
			// 					manifest[file.name] = file.path
			// 				}
			// 				return manifest
			// 			}, seed)

			// 			let entrypointFiles = {}
			// 			let outputFiles = []
			// 			for (const key of entryFileNames) {
			// 				let arr = entrypoints[key].filter((fileName) => !fileName.endsWith('.map'))
			// 				entrypointFiles[key] = arr
			// 				outputFiles = [...outputFiles, ...arr]
			// 			}

			// 			outputFiles = _.uniq(outputFiles)

			// 			return {
			// 				files: manifestFiles,
			// 				entrypoints: entrypointFiles,
			// 				outputFiles,
			// 			}
			// 		},
			// 	})
			// )

			return config
		}
		// addBundleVisualizer()
	),

	devServer: (configFunction) => (proxy, allowedHost) => {
		let config = configFunction(proxy, allowedHost)

		config.proxy = {
			'/api': {
				target: 'http://127.0.0.1:3001/',
				secure: false, //
				changeOrigin: true,
				// rejectUnauthorized: false,
				pathRewrite: {
					'^/api': '/api',
				},
			},
		}

		return config
	},

	jest: (config) => {
		config.moduleNameMapper = {
			...config.moduleNameMapper,
			'^@/(.*)$': '<rootDir>/src/$1',
		}
		return config
	},

	paths: (paths, env) => {
		paths.appBuild = path.resolve('dist')
		return paths
	},
}
