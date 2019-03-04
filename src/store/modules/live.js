import request from '../../utils/request'
import pathname from '../../config/pathName'

const state = {
	liveInfo: {}
}

const getters = {

}

const mutations = {
	commitLiveInfo(state, info) {
		state.liveInfo = info
	}
}

const actions = {
	// 根据room id 获取信息
	async getLiveInfoByRoomId ({ commit, state }, roomId) {
		const result = await request(`${pathname.LIVEINFOBYROOMID}`, 'POST', {
			roomId
		})
		if (result.success) {
			commit('commitLiveInfo', result.data)
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
