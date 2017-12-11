module.exports = {
  devtool: 'inline-source-map',
  entry: __dirname + '/app.js',
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
        test: /\.css$/,
        loaders: ['style-loader','css-loader?url=false' ],
      },
     {
      test: /\.(png|jpg)$/,
      loader: 'url?limit=25000'
    }
    ]
  }
}
