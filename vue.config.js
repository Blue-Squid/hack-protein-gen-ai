const { defineConfig } = require('@vue/cli-service')
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/config': {
        target: 'https://merle-protein-generator.hf.space',
        changeOrigin: true,
      },
    },
  },
  configureWebpack: {
    resolve: {
      fallback: {
        "fs": false,
        "tls": false,
        "net": false,
        "path": false,
        "zlib": false,
        "http": false,
        "https": false,
        "stream": false,
        "crypto": false,
        "url": false,
        "querystring": false,
        "os": false,
        "assert": false,
        "child_process": false,
        "util": false,
        // "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
      } 
    },
    plugins: [
      // new webpack.ProvidePlugin({
      //   process: "process/browser",
      //   Buffer: ["buffer", "Buffer"],
      // }),
      new webpack.NormalModuleReplacementPlugin(/node:/, (resource) => {
        const mod = resource.request.replace(/^node:/, "");
        switch (mod) {
          case "buffer":
            resource.request = "buffer";
            break;
          case "stream":
            resource.request = "readable-stream";
            break;
          default:
            throw new Error(`Not found ${mod}`);
        }
      })
    ],

    // node: {
    //   fs: 'empty',
    //   net: 'empty',
    //   tls: 'empty'
    // },
    }
})
