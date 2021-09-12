const theme = require("./themeConfig.json");

module.exports = {
  purge: [
    "./components/**/*.scss",
    "./components/**/*.jsx",
    "./pages/**/*.jsx",
    "./styles/**/*.scss",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      textColor: {
        skin: {
          base: theme.textColorBase,
          light: theme.textColorLight,
          "extra-light": theme.textColorExtraLight,
          gray: theme.textColorGray,
          highlight: theme.colorHighlight,
          badge1: theme.badgeColor1,
          badge2: theme.badgeColor2,
        },
      },
      backgroundColor: {
        skin: {
          base: theme.bgColorBase,
          light: theme.bgColorLight,
          highlight: theme.colorHighlight,
          badge1: theme.badgeColor1,
          badge2: theme.badgeColor2,
          dark: theme.textColorBase,
        },
      },
      borderColor: {
        skin: {
          base: theme.borderColorBase,
          highlight: theme.borderColorHighlight,
        },
      },
      fontFamily: {
        base: theme.fontFamilyBase,
        bold: theme.fontFamilyBold,
        medium: theme.fontFamilyMedium,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
