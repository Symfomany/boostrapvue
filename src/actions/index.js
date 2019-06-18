import types from "./types";

const actions = {
  modify({ commit }, sentence) {
    commit(types.SENTENCE_MODIFY, sentence);
  }
};

export default actions;
