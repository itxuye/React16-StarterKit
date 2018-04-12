module.exports = {
  entry: {
    main: ['./src/index.tsx'],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.js|\.jsx$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      // Images
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/, // resolve regex conflict with font loader
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              publicPath: '../images',
            },
          },
        ],
      },
      // Font Awesome
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
              publicPath: '../fonts',
            },
          },
        ],
      },
    ],
  },
};
