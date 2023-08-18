module.exports = config => {
   config.optimization.minimizer.filter (({constructor: {name}}) => name === 'TerserPlugin')
      .forEach (terser => {
         terser.options.terserOptions.keep_classnames = true;
         terser.options.terserOptions.keep_fnames = true;
         terser.options.terserOptions.mangle = false;
      });

   config.optimization.minimizer.filter(({constructor: {name}}) => name === 'JavaScriptOptimizerPlugin')
      .forEach((optimizerPlugin) => {
         optimizerPlugin.options.keepNames = true;
      });

   return config;
};
