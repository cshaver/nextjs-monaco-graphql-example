const withCSS = require('@zeit/next-css')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = withCSS({
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    })

    // config.module.rules.push({
    //   // test: /^worker-loader\!/,
    //   loader: 'worker-loader',
    //   // options: { inline: true }, // also works
    //   options: {
    //     name: 'static/[name].worker.js',
    //     publicPath: '/_next/',
    //   },
    // });

    config.plugins.push(
      new MonacoWebpackPlugin({
        // Add languages as needed...
        languages: ['json'],
        filename: 'static/[name].worker.js',
      })
    )

    config.output.globalObject = 'this';

    // weird that there's a 'main.js': [] entry here...
    // this fails `npm run build`
    config.entry = config.entry().then(({ ['main.js']: main, ...entry }) => {
      return {
        ...entry,
        'static/monaco-graphql.worker.js': 'monaco-graphql/esm/graphql.worker.js',
      };
    });

    return config
  },
})
