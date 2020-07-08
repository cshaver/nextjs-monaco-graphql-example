const withCSS = require('@zeit/next-css')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = withCSS({
  webpack: (config, { isServer }) => {
    if (isServer) return config;

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    })

    config.plugins.push(
      new MonacoWebpackPlugin({
        // Add languages as needed...
        languages: ['json'],
        filename: 'static/[name].js',
        workers: [
          {
            id: 'graphqlDev',
            label: 'graphqlDev',
            entry: require.resolve('monaco-graphql/esm/graphql.worker.js'),
          },
        ]
      })
    )

    return config
  },
})
