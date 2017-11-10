module.exports = {
  devtool: 'inline-source-map',
  entry: './app.ts',
  output: {
    filename: 'bundle.js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { 
        test: /\.tsx?$/, 
        loader: 'ts-loader' 
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { 
            loader: 'css-loader', 
            options: { 
              importLoaders: 1 
            } 
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  cssnext: {...options},
                  cssnano: {...options},
                  autoprefixer: {...options}
                }
              }
            }
          }
        ]
      },
    ]
  }
}