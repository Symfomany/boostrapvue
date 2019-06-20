import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";

// Helpers
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
  iconfont: "md",
  theme: {
    primary: colors.blue, // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo,
    error: colors.pink,
    info: colors.teal,
    success: "#01579B",
    warning: "#CDDC39"
  }
});
