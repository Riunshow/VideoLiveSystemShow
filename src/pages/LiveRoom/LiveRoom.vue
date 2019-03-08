<template>
	<div class="liveRoom" v-loading="loading">
		<div class="liveRoomInfo">
			<div class="title">
				<!-- 头像 -->
				<div class="avatarImg">
					<img v-if="!liveInfo.user.avatar" v-avatar="liveInfo.user.nickname" width="130" height="130" />
					<img v-else :src="liveInfo.user.avatar" width="130" height="130" />
				</div>
				<!-- 基本信息 -->
				<div class="titleInfo">
					<!-- 标题名 -->
					<div class="titleName">
						{{liveInfo.title}}
					</div>
					<!-- 分组名 -->
					<div class="cateName">
						分类: {{liveInfo.liveGroup.groupName}}
					</div>
					<!-- 主播 + 热度 + 观众数 -->
					<div class="personalInfo">
						<div class="name">
							主播: {{liveInfo.user.nickname}}
						</div>
						<!-- 数量 -->
						<div class="count">
							<div class="attendance">
								<i class="el-icon-view"></i>
								{{ liveInfo.Attendance }}
							</div>
							<div class="hot">
								<img class="hotImg" src="./../../assets/hot.png" alt="hot">
								{{ liveInfo.hot }}
							</div>
					</div>

					</div>
				</div>
				<!-- 关注，分享 -->
				<div class="options">
					<el-button round>关注</el-button>

					<el-button round>分享</el-button>
				</div>
			</div>
			<div class="liveVideo">
				<flv-player :roomID="parseInt(this.$route.params.roomId)" />
			</div>
			<div class="gift" v-loading="giftLoading">
				<div class="giftTitle">
					<span>为主播赠送礼物，增加人气吧</span>
					<span class="myMoney">我的余额: {{userInfo.balance}} 积分</span>
				</div>
				<div class="giftBlock">
					<div class="giftInfo" v-for="(item, index) in giftInfo" :key="index">
						<GiftComponents 
							:giftInfo="item"
							v-on:getSendGiftId="getSendGiftId"
						/>
					</div>
				</div>

			</div>
		</div>
		<div class="aside">
			<div class="giftRank">
				<div class="title">送礼排行榜</div>
				<div class="rankUserInfo" v-for="(item, index) in richPeopleRank" :key="index">
					<img class="sendGiftUserAvatar" v-if="!item.userAvatar" v-avatar="item.userNickName" />
					<img class="sendGiftUserAvatar" v-else :src="item.userAvatar" alt="">
					<span>第 {{index + 1}} 名: <span class="specialColor">{{item.userNickName}}</span>  共送出 <span class="specialColor">{{item.payMoney}}</span> 积分</span>
				</div>
			</div>
			<div class="danmu">
				danmu
			</div>
			<div class="sendDanmu">
				sendDanmu
			</div>
		</div>
	</div>
</template>

<script>
import FlvPlayer from '@/components/FlvVideo'
import Baberrage from '@/components/Baberrage'
import GiftComponents from './GiftComponents'

import { mapState, mapActions } from 'vuex'

export default {
  components: {
    FlvPlayer,
		Baberrage,
		GiftComponents
  },
	data () {
		return {
			giftInfo: [],
			giftLoading: false,
			loading: false,
			richPeopleRank: []
		};
	},
	async created () {
		this.loading = true
		await this.getLiveInfoByRoomId(this.$route.params.roomId)
		await this.getGiftListByUserId(this.liveInfo.user_id)
		this.giftList.map(x => {
			this.giftInfo.push(...x.gifts)
		})
		await this.getUserById(JSON.parse(sessionStorage.userInfo).id)
		await this.getRichPeople(this.liveInfo.user_id)
		this.richPeopleRank = this.richPeopleList.slice(0, 3)
		this.loading = false
	},
	computed: {
		...mapState('live', ['liveInfo']),
		...mapState('gift', ['giftList', 'richPeopleList']),
		...mapState('user', ['userInfo'])
	},
	methods: {
		...mapActions('live', ['getLiveInfoByRoomId']),
		...mapActions('gift', ['getGiftListByUserId', 'sendGift', 'getRichPeople']),
		...mapActions('user', ['getUserById']),
		async getSendGiftId(giftId) {
			this.giftLoading = true
			const params = {
				fromUserId: JSON.parse(sessionStorage.userInfo).id,
				toUserId: this.liveInfo.user_id,
				giftId
			}
			const sendGiftData = await this.sendGift(params)
			if (sendGiftData.success) {
				this.giftLoading = false
				this.$message.success('赠送礼物成功')		
			}
			await this.getUserById(JSON.parse(sessionStorage.userInfo).id)
			await this.getRichPeople(this.liveInfo.user_id)
			this.richPeopleRank = this.richPeopleList.slice(0, 3)
		}
	}
}
</script>

<style lang="scss" scoped>
.liveRoom {
	margin: 0 auto;
	width: 1000px;
	display: flex;

	.liveRoomInfo {
		width: 700px;
		

		.title {
			height: 130px;
			width: 100%;
			background-color: #fff;
			// border: 1px solid #e5e5e5;
			display: flex;
			border: 1px solid rgb(255, 102, 0);
			border-radius: 5px;

			.avatarImg {
				img {
					border-radius: 5px;
				}
			}

			.titleInfo {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				padding: 10px;
				text-align: left;
				font-size: 13px;
				width: 450px;

				.titleName {
					line-height: 20px;
					font-size: 20px;
				}
				.cateName {
					line-height: 20px;
				}
				.personalInfo {
					display: flex;

					.name {
						line-height: 20px;
					}
					.count {
						display: flex;
						line-height: 20px;

						.attendance, .hot {
							margin-left: 15px;
							display: flex;
							align-items: center;
						}

						.attendance {
							i {
								margin-right: 5px;								
							}
						}

						.hot {
							.hotImg {
								height: 16px;
								width: 16px;
								margin-right: 5px;
							}
						}
					}
				}

			}

			.options {
				display: flex;
				align-items: flex-end;
				justify-content: center;
				padding: 0 15px 15px 0;

				.el-button+.el-button {
					margin: 0;
				}
			}
		}

		.liveVideo {
			padding: 10px 0;
		}

		.gift {
			height: 78px;
			background-color: #fff;
			padding: 10px;
			border: 1px solid rgb(255, 102, 0);
			border-radius: 5px;

			.giftTitle {
				height: 20px;
				line-height: 20px;
				margin-bottom: 10px;
				display: flex;
				justify-content: space-between;

				.myMoney {
					font-size: 13px;
					color: rgb(255, 102, 0);
				}
			}
			.giftBlock {
				display: flex;
				line-height: 50px;
				height: 50px;

				.giftInfo {
					margin-right: 10px;
					cursor: pointer;
				}
				.giftInfo:hover {
					box-shadow: 0 2px 12px 0 rgba(0,0,0,.2);
				}
			}
		}
	}

	.aside {
		width: 300px;
		height: 650px;
		margin-left: 10px;
		border-left: 1px solid rgb(255, 102, 0);
		border-right: 1px solid rgb(255, 102, 0);
		border-radius: 5px;
		
		.giftRank {
			height: 130px;
			background-color: #fff;
			border-top: 1px solid rgb(255, 102, 0);
			border-bottom: 1px solid rgb(255, 102, 0);
			border-radius: 5px;

			.title{
				height: 20px;
				line-height: 20px;
				margin-top: 5px;
			}
			.rankUserInfo {
				height: 30px;
				line-height: 30px;
				display: flex;
				margin: 0 0 5px 10px;
				font-size: 14px;

				.specialColor {
					color: rgb(255, 102, 0);
				}

				.sendGiftUserAvatar {
					height: 30px;
					width: 30px;
					border-radius: 15px;
					margin-right: 5px;
				}
			}
		}

		.danmu {
			margin: 10px 0;
			height: 400px;
			background-color: aquamarine;
			border-radius: 5px;
			border-top: 1px solid rgb(255, 102, 0);
			border-bottom: 1px solid rgb(255, 102, 0);

		}

		.sendDanmu {
			height: 98px;
			background-color: aliceblue;
			border-radius: 5px;
			border-top: 1px solid rgb(255, 102, 0);
			border-bottom: 1px solid rgb(255, 102, 0);

		}
	}


}
</style>