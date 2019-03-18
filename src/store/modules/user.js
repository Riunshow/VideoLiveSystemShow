import request from '../../utils/request'
import pathname from '../../config/pathName'

const state = {
	msg: '获取验证码',
	countTime: 60,
	canClickGetSmscode: false,
	userInfo: {}
}

const getters = {
	msg(state){
		return state.msg
	},
	count(state){
		return state.count
	}
}

const mutations = {
	commitChangeMsg(state) {
		state.canClickGetSmscode = true
		state.msg = `请等待${state.countTime}秒`
		state.countTime--
	},
	resetState(state) {
		state.msg = '获取验证码'
		state.countTime = 60
		state.canClickGetSmscode = false
	},
	commitUserInfo(state, userInfo) {
		switch (userInfo.role) {
			case 1:
				userInfo.roleName = '普通用户'
				break;
			case 2:
				userInfo.roleName = '主播'
				break;
			case 3:
				userInfo.roleName = '管理员'
				break;
			case -1:
				userInfo.roleName = '黑名单用户'
				break;
			default:
				break;
		}
		state.userInfo = userInfo
	}
}

const actions = {
	// 获取短信验证码
	async getSmsCode({ commit, state }, params) {
		const result = await request(pathname.SMSCODE, 'POST', params)

		if (result.success) {
			commit('commitChangeMsg')

			let timer = setInterval(() => {
				if (state.countTime > 0) {
					commit('commitChangeMsg')
				}else {
					clearInterval(timer)
					commit('resetState')
				}
			}, 1000)
		}
		
		return result
	},
	// 根据用户id获取用户信息
	async getUserById({ commit, state }, userId) {
		const result = await request(pathname.USERBYID, 'POST', {
			userId
		})

		if (result.success) {
			commit('commitUserInfo', result.data)
		}
	}

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
