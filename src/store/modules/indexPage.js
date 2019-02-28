import request from '../../utils/request'
import pathname from '../../config/pathName'

const state = {
  menuList: [],
  loading: true
}

const getters = {

}

const mutations = {
  commitMenuList(state, list, loading) {
    state.menuList = list
    state.loading = loading
	},
}

const actions = {
  async getMenuList ({ commit, state }, params) {

    const result = await request('/api/admin/getLiveGroupList?limit=100')
    if (result.success) {
      commit('commitMenuList', result.data, false)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
