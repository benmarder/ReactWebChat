module.exports = {
  devtool: 'inline-source-map',
  entry: __dirname + '/app.jsx',
  output: {
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        loader : 'babel',
        exclude: /node_modules/,
        query:{
          plugins:['transform-decorators-legacy']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
}
