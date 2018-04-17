var webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const occurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin()
const hotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin()
const cleanWebpackPlugin = new CleanWebpackPlugin(['dist'])
/**
 * The always write to disk option is available because of the hard disk plugin.
 * This setup enables hard disk writting for Webpack dev server.
 * @type {HtmlWebpackPlugin}
 */
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  alwaysWriteToDisk: true,
  template: 'index.html'
})
const htmlWebpackHarddiskPlugin = new HtmlWebpackHarddiskPlugin({
  /**
   * Output path is used by middleware like webpack dev server as a location from
   * which files will be served.
   * @type {String}
   */
  outputPath: path.resolve(__dirname, 'dist')
})
const extractTextPlugin = new ExtractTextPlugin({
  /**
   * Location and filename where the extracted css will be saved.
   * @type {String}
   */
  filename: 'css/index.css'
})

module.exports = env => {
  /**
   * In package json under scripts we set the --env.NODE_ENV= variable.
   * If we are in development set the debug variable to true.
   * @type {Boolean}
   */
  let debug = env ? env.NODE_ENV !== 'production' : true

  /*
   * Because of env, now we have a function and we need to return the
   * configuration.
   */
  return {
    /**
     * This is the base directory, an absolute path, for resolving entry points
     * and loaders from configuration.
     * Here we can also use path.resolve, example:
     * path.resolve(__dirname, "directory")
     * @type {String}
     */
    context: __dirname,
    /**
     * If env is debug do inline-sourcemapping which helps console logging
     * https://webpack.js.org/configuration/devtool/#devtool
     * @type {[type]}
     */
    devtool: debug ? 'inline-sourcemap' : false,
    /**
     * Webpack dev server, by adding /webpack-dev-server to the url we can see
     * where the files are being served from, example:
     * localhost:8888/webpack-dev-server
     * @type {Object}
     */
    devServer: {
      /**
       * With contentBase we can tell the server where to serve content from.
       * This is only necessary if we want to serve static files.
       * @type {String}
       */
      contentBase: path.resolve(__dirname, 'dist'),
      /**
       * Watch for changes on all the files under contentBase.
       * @type {Boolean}
       */
      watchContentBase: true,
      /**
       * In order to enable gzip compression for everything served we need to
       * set the compress option.
       * @type {Boolean}
       */
      compress: true,
      /**
       * We can set deploy port number for the application in the
       * webpack-dev-server.
       * @type {Number}
       */
      port: 8888,
      /**
       * We can control what bundle information is displayed. To show only errors
       * more info on stats options https://webpack.js.org/configuration/stats
       * @type {String}
       */
      stats: 'errors-only',
      /**
       * If we want dev-server to open the app at the first time in our browser
       * and just refresh afterwards while we change our code we can use the
       * open option.
       * @type {Boolean}
       */
      open: true,
      /**
       * Inline option adds “Live reloading” for the entire page.
       * @type {Boolean}
       */
      inline: true,
      /**
       * Hot option enables “Hot Module Reloading” HMR that tries to reload just
       * the component that’s changed. By setting both inline and hot options,
       * HMR will be done first and if that is not enough the entire page will
       * reload because of the inline option.
       * @type {Boolean}
       */
      hot: true,
      /**
       * In order to be able to use react-router-dom (or any other routing
       * package) this option has to be set to true, reference:
       * https://tylermcginnis.com/react-router-cannot-get-url-refresh/
       * @type {Boolean}
       */
      historyApiFallback: true
    },
    /**
     * Entry source, where magic needs to happen Q.Q
     * @type {String}
     */
    entry: './js/scripts.js',
    /**
     * Output option has the path to the folder where we will create the new
     * bundle with name as filename.
     * @type {Object}
     */
    output: {
      /**
       * Path tells Webpack where it should store the result.
       * We can make use of output path using nodeJs path module or just do
       * string concatenation (using path is preffered).
       * path.resolve https://nodejs.org/dist/latest-v6.x/docs/api/path.html#path_path_resolve_paths
       * path.join https://nodejs.org/dist/latest-v6.x/docs/api/path.html#path_path_join_paths
       * @type {String}
       */
      path: path.resolve(__dirname, 'dist'),
      /**
       * publicPath is used by Webpack plugins to update the URLs inside CSS,
       * HTML files when generating production builds.
       * We need to set the public path option to the folder that stores the bundle
       * https://webpack.js.org/configuration/dev-server/#devserver-publicpath-
       * @type {String}
       */
      publicPath: '/',
      /**
       * Naming with multiple bundles for multiple entry points is possible:
       * using the entry name "[name].bundle.js"
       * using the hash based on each chunk's content "[chunkhash].bundle.js"
       * more on https://webpack.js.org/configuration/output/#output-filename
       * @type {String}
       */
      filename: 'js/bundle.js',
      chunkFilename: '[id].[hash].bundle.js'
    },
    /**
     * This option determines how the different types of modules in the project
     * will be treated https://webpack.js.org/configuration/module/
     * @type {Object}
     */
    module: {
      /**
       * In order to boost build performances we can ignore some large libraries
       * if they pass the regex test.
       * @param  {String} content File name
       * @return {Boolean}        True if the content doesn't need to be parsed
       */
      noParse: function(content) {
        return /jquery|lodash/.test(content)
      },
      /**
       * Every element of the rules option array is an object containing
       * individual loaders and their respective configurations.
       * @type {Array}
       */
      rules: [
        // Babel loader
        {
          /**
           * Required option, the loader needs to know which file extension it’s
           * going to work with.
           * @type {RegExp}
           */
          test: /\.js$/,
          /**
           * Optional, the loader needs a directory to locate where it’s working
           * files are stored.
           * @type {RegExp}
           */
          include: /js/,
          /**
           * Optional, in order to save a lot of memory and execution time we
           * don't need to parse modules from a specific directory.
           * @type {RegExp}
           */
          exclude: /node_modules/,
          /**
           * Required option, the rule must have a loader property as a string.
           * Here we set the loaders we want to use.
           * Loaders can be chained by passing multiple loaders, they will be
           * applied from right to left (last to first configured).
           * They can have options property as a string or object.
           * This value is passed to the loader, which should interpret it as
           * loader options https://webpack.js.org/configuration/module/#module-rules
           * @type {Object}
           */
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env']
            }
          }
        },
        // HTML loader
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                /**
                 * This option will minimize the .html files, like UglifyJs does
                 * to .js files https://webpack.js.org/loaders/html-loader/#examples
                 * @type {Boolean}
                 */
                minimize: !debug // if in production mode minimize html file
              }
            }
          ]
        },
        // SCSS, CSS loaders
        {
          test: /\.(css|scss|sass)$/,
          include: /scss/,
          use: extractTextPlugin.extract({
            // postcss loader is used in order for autoprefixer to auto add
            // browser specific prefixes
            use: [
              {
                // the css loader is set up to use CSS modules spec.
                // More on https://github.com/webpack-contrib/css-loader#modules
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 2, // postcss and sass
                  localIdentName: '[name]___[local]___[hash:base64:5]'
                }
              },
              'postcss-loader',
              'sass-loader'
            ],
            fallback: 'style-loader'
          })
        },
        // File loader for pictures
        {
          test: /\.(jpe?g|png|gif|svg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192, // return DataURL if image size <= 8KB
                name: 'assets/[name].[ext]',
                fallback: 'file-loader' // use file loader for size > 8KB
              }
            }
          ]
        },
        // File loader for fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader']
        }
      ]
    },
    /**
     * Since Webpack 4 optimizations are removed from the plugin option, now
     * we need to setup the optimization option.
     * @type {Object}
     */
    optimization: debug
      ? {}
      : {
          /**
           * For production we can uglify the .js files.
           * @type {Boolean}
           */
          minimize: true
        },
    /**
     * The plugins option is used to customize the Webpack build process in
     * different ways. We can run different plugins depending on the environment.
     * @type {Array}
     */
    plugins: debug
      ? [
          /**
           * Enable hot option under devServer.
           * @type {Object}
           */
          hotModuleReplacementPlugin,
          /**
           * Enable .html files script bundling and minimization (check html-loader).
           * @type {Object}
           */
          htmlWebpackPlugin,
          /**
           * Enables hard disk file writting for html script injection. This way
           * Webpack's dev server will see the injected script.
           * @type {[type]}
           */
          htmlWebpackHarddiskPlugin,
          /**
           * Extracts css from the bundle.
           * @type {[type]}
           */
          extractTextPlugin,
          /**
           * Get environment variables by using process.env, options:
           * systemvars (false) - If true, will add all system variables as well
           * silent (false) - If true, all warnings will be surpressed
           * safe (false) - If false ignore safe-mode, if true load
           * './.env.example', if a string load that file as the sample.
           * @type {Object}
           */
          new Dotenv({
            path: '.env.dev',
            systemvars: true
          })
        ]
      : [
          /**
           * We can clear the content from our dist folder before every build:prod
           * by utilising the clean-webpack-plugin https://github.com/johnagan/clean-webpack-plugin
           * @type {Object}
           */
          cleanWebpackPlugin,
          htmlWebpackPlugin,
          htmlWebpackHarddiskPlugin,
          extractTextPlugin,
          /**
           * Official docs https://github.com/webpack/docs/wiki/optimization:
           * Webpack gives our modules and chunks ids to identify them. Webpack can
           * vary the distribution of the ids to get the smallest id length for
           * often used ids with a simple option.
           * @type {Object}
           */
          occurrenceOrderPlugin,
          new Dotenv({
            path: '.env.prod',
            systemvars: true
          })
        ]
  }
}
