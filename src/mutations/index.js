const mutations = {
  modify(state, payload) {
    state.phrase = payload.newSentence;
  }
};

export default mutations;
