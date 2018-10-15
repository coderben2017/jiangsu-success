const path = require('path');
const Webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TsImportPlugin = require('ts-import-plugin');

const SRC_PATH = path.resolve(__dirname, 'src');
const DIST_PATH = path.resolve(__dirname, 'dist');
const NM_PATH = path.resolve(__dirname, 'node_modules');
const resolveSource = function (file) {
  return path.resolve(SRC_PATH, file);
};
const resolveModule = function (file) {
  return path.resolve(NM_PATH, file);
}

// dev, dev:build, build
const target = process.env.npm_lifecycle_event;
const isProd = target === 'build';
const isDev = target === 'dev';

const entry = resolveSource('main.tsx');

const output = {
  path: DIST_PATH,
  publicPath: '/',
  filename: 'js/[name].bundle.js',
};

const configModule = {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      exclude: NM_PATH,
      loader: 'source-map-loader'
    },
    {
      test: /\.tsx?$/,
      exclude: NM_PATH,
      loader: 'ts-loader',
      options: {
        getCustomTransformers() {
          return {
            before: [TsImportPlugin({style: 'css'})]
          };
        }
      }
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              minimize: isProd ? true : false
            }
          }
        ]
      })
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/,
      loader: 'file-loader',
      options: { name: 'images/[name].[ext]' }
    },
  ]
};

const resolve = {
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  modules: [SRC_PATH, NM_PATH],
  unsafeCache: /node_modules/,
  plugins: [new TsconfigPathsPlugin()]
}

const plugins = [
  new Webpack.NamedModulesPlugin(),
  new Webpack.NoEmitOnErrorsPlugin(),
  new Webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function (module) {
      return module.resource && module.resource.indexOf('node_modules') >= 0 && module.resource.match(/.js$/);
    }
  }),
  new Webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  new ExtractTextPlugin('css/styles.css'),
  new HtmlPlugin({
    template: resolveSource('index.html'),
    minify: {
      collapseWhitespace: true,
      removeComments: true
    }
  }),
  new ScriptExtHtmlWebpackPlugin({
    inline: ['manifest']
  })
];

const devServer = {
  contentBase: DIST_PATH,
  historyApiFallback: true
}

const devtool = isProd ? false : 'cheap-module-eval-source-map';

const watch = isProd ? false : true;

const watchOptions = {
  ignored: /node_modules/
};

module.exports = {
  entry,
  output,
  module: configModule,
  resolve,
  plugins,
  devServer,
  devtool,
  watch,
  watchOptions,
};
