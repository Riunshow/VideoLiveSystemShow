import request from '../../utils/request'
import pathname from '../../config/pathName'

const state = {
	liveInfo: {
		user: {
			avatar:'',
		},
		liveGroup: {
			groupName: ''
		}
	},
	currentRoomId: null,
	lastRoomId: null,
	isFullScreenStatus: false,
}

const getters = {

}

const mutations = {
	commitLiveInfo(state, info) {
		state.liveInfo = info
	},
	commitRoomId(state, currentRoomId) {
		state.currentRoomId = currentRoomId
	},
	commitLastRoomId(state) {
		console.log('state.currentRoomId: ', state.currentRoomId)
		if(state.currentRoomId) {
			state.lastRoomId = state.currentRoomId
		}
	},
	commitIsFullScreenStatus(state, isFullScreenStatus) {
		state.isFullScreenStatus = isFullScreenStatus
	},
	commitResetLiveInfo(state) {
		state.liveInfo = {
			user: {
				avatar:'',
			},
			liveGroup: {
				groupName: ''
			}
		}
	}
}

const actions = {
	// 根据room id 获取信息
	async getLiveInfoByRoomId ({ commit, state }, roomId) {
		commit('commitResetLiveInfo')
		const result = await request(pathname.LIVEINFOBYROOMID, 'POST', {
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
