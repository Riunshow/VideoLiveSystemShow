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
	wantedInfo: {}
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
	},
	commitWantedInfo(state, wantedInfo) {
		state.wantedInfo = wantedInfo
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
	// 获取用户申请直播间信息
	async getWantedStatus({ commit, state }, user_id) {
		const result = await request(pathname.GETWANTEDSTATUSBYUSERID, 'POST', {
			user_id
		})
		if (result.success) {
			commit('commitWantedInfo', result.data)
		}
	},
	// 申请
	async sendApplication({ commit, state }, options) {
		const {user_id, realName, idCardNum} = options
		const result = await request(pathname.SendWantedByUserId, 'POST', {
			user_id,
			realName,
			idCardNum
		})
		return result
	}
	
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
