const path = require('path');
const webpack = require('webpack');
const copyPlugin = require('copy-webpack-plugin')

module.exports = {
	entry: {
		content: './src/content/content.ts',
	},
	output: {
		path: path.resolve(__dirname, 'dist/'),
		filename: '[name].min.js'
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						// TODO: revert to options object once babel-loader fully supports it.
						query: 'presets[]=es2015'
					},
					'ts-loader'
				]
			}
		]
	},
	resolve: {
		modules: [
			__dirname,
			'node_modules'
		],
		extensions: ['.ts','.tsx','.js']
	},
	//TODO: separate these plugins between dev and prod.
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			output: {
				ascii_only: true
			}
		}),
		new copyPlugin([
			{ from: 'src/manifest.json' }
		])
	]
}
