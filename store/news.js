const news = {
  state: () => ({
    detailNews: {},
    listNews: [],
    prvScroll: 0,
    refChildCommentReport: 0,
  }),
  mutations: {
    setDetailNews(state, payload) {
      state.detailNews = { ...payload }
    },
    setListNews(state, payload) {
      state.listNews = [...payload]
    },
    setPrvScroll(state, number) {
      state.prvScroll = number
    },
    setRefChildCommentReport(state, number) {
      state.refChildCommentReport = number
    },
  },
  actions: {},
}
export default news
