module.exports = {
  transpileDependencies: ["vuetify"],
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "./styles/sass/_global.sass"
        `,
      },
    },
  },
};
