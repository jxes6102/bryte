const path = require('path');
const { CKEditorTranslationsPlugin } = require('@ckeditor/ckeditor5-dev-translations');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');
const ver = new Date().getTime() + '-1.0.0.0';

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    https: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5222/',
        // changeOrigin: true,
        pathRewrite: {
          '^/api': '/api'
        }
      },
      '/hub': {
        target: 'http://localhost:5222/',
        // changeOrigin: true,
        pathRewrite: {
          '^/hub': '/hub'
        }
      }
    }
  },
  publicPath: '/',
  filenameHashing: true,
  transpileDependencies: true,
  // The source of CKEditor&nbsp;5 is encapsulated in ES6 modules. By default, the code
  // from the node_modules directory is not transpiled, so you must explicitly tell
  // the CLI tools to transpile JavaScript files in all ckeditor5-* modules.
  // transpileDependencies: [
  //     /ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/,
  // ],

  configureWebpack: {
    plugins: [
      // CKEditor&nbsp;5 needs its own plugin to be built using webpack.
      new CKEditorTranslationsPlugin({
        // See https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
        language: 'en',

        // Append translations to the file matching the `app` name.
        translationsOutputFile: /app/
      })
    ],
    output: {
      filename: `js/[name].[chunkhash].${ver}.js`,
      chunkFilename: `js/[id].[chunkhash].${ver}.js`,
    }
  },
  css: {
    extract: {
      filename: `css/[name].[chunkhash].${ver}.css`,
      chunkFilename: `css/[id].[chunkhash].${ver}.css`,
    }
  },

  // Vue CLI would normally use its own loader to load .svg and .css files, however:
  //	1. The icons used by CKEditor&nbsp;5 must be loaded using raw-loader,
  //	2. The CSS used by CKEditor&nbsp;5 must be transpiled using PostCSS to load properly.
  chainWebpack: config => {
    // (1.) To handle the editor icons, get the default rule for *.svg files first:
    const svgRule = config.module.rule('svg');

    // Then you can either:
    //
    // * clear all loaders for existing 'svg' rule:
    //
    //		svgRule.uses.clear();
    //
    // * or exclude ckeditor directory from node_modules:
    svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));

    // Add an entry for *.svg files belonging to CKEditor. You can either:
    //
    // * modify the existing 'svg' rule:
    //
    //		svgRule.use( 'raw-loader' ).loader( 'raw-loader' );
    //
    // * or add a new one:
    config.module
      .rule('cke-svg')
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader');

    // (2.) Transpile the .css files imported by the editor using PostCSS.
    // Make sure only the CSS belonging to ckeditor5-* packages is processed this way.
    config.module
      .rule('cke-css')
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use('postcss-loader')
      .loader('postcss-loader')
      .tap(() => {
        return {
          postcssOptions: styles.getPostCssConfig({
            themeImporter: {
              themePath: require.resolve('@ckeditor/ckeditor5-theme-lark'),
            },
            minify: true
          })
        };
      });
  }
})