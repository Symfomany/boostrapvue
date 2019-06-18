const getters = {
  longeur: state => state.phrase.length,
  firstLetter: state => state.phrase[0]
};

export default getters;
