const { environment } = require('@rails/webpacker')
const customConfig = require('./custom')
const vue =  require('./loaders/vue')
const webpack = require('webpack')

// Merge custom config
environment.config.merge(customConfig)

environment.loaders.append('vue', vue)

environment.plugins.prepend(
  'Provide',
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    jquery: 'jquery',
  })
)

module.exports = environment
