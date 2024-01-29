module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          strictMath: true,
          // Other Less options if needed
        },
      },
      postcss: {
        postcssOptions: {
          plugins: [
            require("postcss-nested")(), // Add postcss-nested plugin
            // Other PostCSS plugins if needed
          ],
        },
      },
    },
  },
};
