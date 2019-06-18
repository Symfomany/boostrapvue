import types from "../actions/types";

const mutations = {
  [types.SENTENCE_MODIFY](state, payload) {
    state.phrase = payload.newSentence;
  },
  [types.SENTENCE_CLEAR](state) {
    state.phrase = "";
  },
  [types.SENTENCE_MAJUSCULE](state) {
    state.phrase = state.phrase.toUpperCase();
  },
  [types.SENTENCE_MINUSCULE](state) {
    state.phrase = state.phrase.toLowerCase();
  },
  [types.SENTENCE_MANGER](state) {
    state.phrase = "Mozzarella Buffala Campone";
  },
  [types.SENTENCE_SPECIALITE](state) {
    state.phrase = "Bouchon Lyonnais 😊";
  }
};

export default mutations;
