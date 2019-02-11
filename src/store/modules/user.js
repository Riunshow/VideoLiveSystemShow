import request from '../../utils/request'
import pathname from '../../config/pathName'

const state = {
	msg: '获取验证码',
	countTime: 60,
	canClickGetSmscode: false,
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
	}
}

const actions = {
	async actionFn ({ commit, state }, params) {},
	async getSmsCode({ commit, state }, params) {
		const result = await request(pathname.SMSCODE, 'post', params)

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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
