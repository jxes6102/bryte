const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  filenameHashing: true,
  transpileDependencies: true
})