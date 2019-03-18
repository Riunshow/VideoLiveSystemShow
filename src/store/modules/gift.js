import request from '../../utils/request'
import pathname from '../../config/pathName'
import { quickSortRichPeople } from '../../utils/common'

const state = {
	defaultGiftList: [],
	giftList: [],
	richPeopleList: []
}

const getters = {

}

const mutations = {
	commitGiftList(state, list) {
		state.giftList = list
	},
	commitDefaultGiftList(state, list) {
		state.defaultGiftList = list
	},
	commitRichPeople(state, list) {
		state.richPeopleList = list
	},
}

const actions = {
	//获取默认礼物
	async getDeafultGift({ commit, state }) {
		const result = await request(pathname.GetDefaultGiftList)
		if (result.success) {
			commit('commitDefaultGiftList', result.data)
		}
	},
	// 根据user id 获取信息
	async getGiftListByUserId ({ commit, state }, userId) {
		const result = await request(pathname.GETGIFTLISTBYUSERID, 'POST', {
			userId
		})
		if (result.success) {
			commit('commitGiftList', result.data)
		}
	},
	// 送礼物
	async sendGift({ commit, state }, params) {
		const { fromUserId, toUserId, giftId } =  params
		const result = await request(pathname.SENDGIFT, 'POST', {
			fromUserId,
			toUserId,
			giftId
		})

		return result
	},
	// 礼物榜
	async getRichPeople({ commit, state }, userId) {
		const result = await request(pathname.GETRICHPEOPLE, 'POST', {
			userId
		})
		if (result.success) {
			
			const tmpData = []
			let countIndex = -1
			result.data.forEach(item => {

				if (tmpData.length == 0 || (tmpData[countIndex] && tmpData[countIndex].userId !== item.send_gift_user_id) ){
					tmpData.push({
						userId: item.send_gift_user_id,
						userAvatar: item.user.avatar,
						userNickName: item.user.nickname,
						payMoney: parseInt(item.gift.price)
					})
					countIndex++
				}else {
					tmpData[countIndex].payMoney += parseInt(item.gift.price)
				}
			})

			const sortData = quickSortRichPeople(tmpData).reverse()
			commit('commitRichPeople', sortData)
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
