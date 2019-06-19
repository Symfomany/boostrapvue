import Vue from "vue";
import Vuex from "vuex";

// Layers of VueX: getters, stare, mutations, actions
import state from "./state/index";
import getters from "./getters/index";
import mutations from "./mutations/index";
import actions from "./actions/index";

Vue.use(Vuex);

/**
 * A store is a set of state, getters, mutations & actions
 * components -> state access -> action -> mutations -> modify a bit of state -> good components refreshed
 * Several stores in plugins VueX (namespace)
 */
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
