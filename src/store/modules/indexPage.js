import request from '../../utils/request'
import pathname from '../../config/pathName'

const state = {
  menuList: [],
  liveList: [],
  loading: true
}

const getters = {

}

const mutations = {
  commitMenuList(state, list) {
    state.menuList = list
  },
  commitLiveList(state, list) {
    state.liveList = list
  },
  commitLoadingStatus(state, loading) {
    state.loading = loading
  },
  resetState(state) {
    state.liveList = []
  }
}

const actions = {
  // 获取侧边栏列表
  async getMenuList ({ commit, state }, params) {
    commit('commitLoadingStatus', true)
    const result = await request(`${pathname.GROUPLIST}?limit=100`)
    if (result.success) {
      commit('commitMenuList', result.data)
    }
    commit('commitLoadingStatus', false)
  },
  // 获取所有开播的直播列表
  async getLiveList({ commit, state }, params) {
    commit('resetState')
    commit('commitLoadingStatus', true)
    const result = await request(pathname.LIVELIST)
    if (result.success) {
      commit('commitLiveList', result.data)
    }
    commit('commitLoadingStatus', false)
  },
  // 根据分组id获取所有开播的直播列表
  async getLiveListByGroupId({ commit, state }, params) {
    commit('resetState')
    commit('commitLoadingStatus', true)
    const { live_group_id } = params
    const result = await request(pathname.LIVELISTBYGROUPID, 'POST', {
      live_group_id
    })
    if (result.success) {
      commit('commitLiveList', result.data.filter(x => x.status !== 0))
    }
    commit('commitLoadingStatus', false)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
