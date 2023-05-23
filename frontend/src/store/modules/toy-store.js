import { toyService } from '@/services/toy-service.js'

export default {
  state: {
    toys: [],
    filterBy: { name: '', inStock: '', labels: [], sortBy: '' },
    labels: toyService.getlabels(),
  },

  getters: {
    toys({ toys }) {
      return toys
    },
    toysToShow({ toys, filterBy }) {
      const copyToys = JSON.parse(JSON.stringify(toys))
      return copyToys
    },
    labels({ labels }) {
      return labels
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys
    },
    saveToy(state, { toy }) {
      const idx = state.toys.findIndex((t) => t._id === toy._id)
      if (idx !== -1) state.toys.splice(idx, 1, toy)
      else state.toys.push(toy)
    },
    removeToy(state, { toyId }) {
      const idx = state.toys.findIndex((t) => t._id === toyId)
      state.toys.splice(idx, 1)
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    },
    setSort(state, { sortBy }) {
      state.sortBy = sortBy
    },
  },
  actions: {
    loadToys({ commit, state }) {
      toyService.query(state.filterBy).then((toys) => {
        commit({ type: 'setToys', toys })
      })
    },
    saveToy({ commit }, { toy }) {
      toyService.save(toy).then((savedToy) => {
        commit({ type: 'saveToy', toy: savedToy })
      })
    },
    removeToy({ commit }, { toyId }) {
      toyService.remove(toyId).then(() => {
        commit({ type: 'removeToy', toyId })
      })
    },
    setFilter({ dispatch, commit }, { filterBy }) {
      commit({ type: 'setFilter', filterBy })
      dispatch({ type: 'loadToys' })
    },
  },
}
