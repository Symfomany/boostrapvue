import types from "./types";

const actions = {
  modify({ commit }, sentence) {
    commit(types.SENTENCE_MODIFY, sentence);
  },
  cleared({ commit }) {
    commit(types.SENTENCE_CLEAR);
  },
  majuscule({ commit }) {
    commit(types.SENTENCE_MAJUSCULE);
  },
  minuscule({ commit }) {
    commit(types.SENTENCE_MINUSCULE);
  },
  manger({ commit }) {
    commit(types.SENTENCE_MANGER);
  }
};

export default actions;
