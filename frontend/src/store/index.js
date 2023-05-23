import { createStore } from 'vuex'
import toyStore from './modules/toy-store'
import userStore from './modules/user-store'
import reviewStore from './modules/review-store'

const store = createStore({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    toyStore,
    userStore,
    reviewStore,
  },
})

export default store
