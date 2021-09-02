const theme = require("./themeConfig.json");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        skin: {
          base: theme.textColorBase,
          light: theme.textColorLight,
          highlight: theme.colorHighlight,
        },
      },
      backgroundColor: {
        skin: {
          base: theme.bgColorBase,
          light: theme.bgColorLight,
          highlight: theme.colorHighlight,
        },
      },
      fontFamily: {
        base: theme.fontFamilyBase,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
