var config = {
   entry: './main.js',
	debug: true,
   output: {
      path:'./',
      filename: 'index.js',
   },

   devtool:'source-map',
  
   devServer: {
      
      inline:true,
      port: 8080
   },   
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react' , 'stage-3']
            }
         },
         {          
            test: /\.css$/, loader: "style-loader!css-loader" 
         }, 
         {             
            test: /\.less$/, loader: "style-loader!css-loader!less-loader" 
         },   
         {             
            test: /\.(gif|png)$/, loader: "url-loader?mimetype=image/png" 

         },  
        { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
        { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }

      ]
   }
}

module.exports = config;
