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
				<!-- 直播 -->
				<flv-player 
					:roomID="parseInt(this.$route.params.roomId)" 
					:volume="volume"
					class="flvPlayerVideo"
				/>
				<!-- 覆盖弹幕 -->
				<baberrage
					v-if="isOpenDanmu"
					:isShow= "barrageIsShow"
					:barrageList = "barrageList"
					:loop = "barrageLoop"
					:boxWidth="700"
					:boxHeight="400"
					class="videoDanmu"
					>
				</baberrage>
				<div v-else class="videoDanmu" style="height: 400px; top: -400px; position: relative;">

				</div>
				<!-- 操作 -->
				<div class="videoOptions">
					<div class="bottomOptions">
						<!-- 声音控制 -->
						<div class="controlVoice">
							<img class="voicePng" src="./../../assets/voice.png" alt="">
							<el-slider v-model="controlVoice" @change="changeVoice"></el-slider>
						</div>
						<!-- 弹幕控制 -->
						<div class="closeDanmu">
							<el-switch
								v-model="isOpenDanmu"
								active-text="开启弹幕"
								inactive-text=""
								active-color="rgb(255, 102, 0)"
								inactive-color="#dcdfe6"
								@change="switchBlock"
							>
							</el-switch>
						</div>
						<!-- 全屏控制 -->
						<div class="fullScreen">
							<el-tooltip class="item" effect="dark" content="全屏显示" placement="top" :enterable="false">
								<img @click="fullScreenControl" class="fullScreenPng" src="./../../assets/fullScreen.png" alt="">
							</el-tooltip>
						</div>
					</div>
				</div>
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
			<div class="danmu" ref="danmuMove">
				<div class="danmuBlock" v-if="isOpenAsideDanmu">
					<div class="danmuInfo" v-for="(item, index) in asideBarrageList" :key="index">
						{{item.nickName}}: <span class="danmuMsg"> {{item.msg}} </span>
					</div>
				</div>
				<div v-else class="cleanDanmu">
					已开启纯净模式
				</div>
			</div>
			<div class="sendDanmu">
				<div class="sendDanmuOptions">
					<el-popover
						placement="top-start"
						width="150"
						trigger="hover">
						<div>
							<el-switch
								v-model="isOpenAsideDanmu"
								active-text="开启侧边弹幕"
								inactive-text=""
								active-color="rgb(255, 102, 0)"
								inactive-color="#dcdfe6"
								@change="switchAsideBlock"
							>
							</el-switch>
						</div>
						<img slot="reference" class="xxx" src="./../../assets/closeDanmu.png" alt="">
					</el-popover>
				</div>
				<el-input 
					placeholder="请输入内容" 
					v-model="inputSM" 
					class="danmuInput"
					:disabled="!isOpenAsideDanmu"
				>
					<el-button slot="append" @click="addToList" :disabled="!isOpenAsideDanmu">发送</el-button>
				</el-input>
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
			richPeopleRank: [],
			// 播放器
			volume: 0,
			// dan mu cover
			inputSM: '',
			currentDanmuId: 0,
			barrageIsShow: true,
      barrageLoop: false,
			barrageList: [],
			isOpenDanmu: true,
			controlVoice: 0,
			// 弹幕 侧边
			asideBarrageList: [],
			isOpenAsideDanmu: true,
		};
	},
	watch: {
		async "$route"() {
			await this.allFetch()
		}
	},
	async created () {
		await this.allFetch()
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
		async allFetch() {
			this.loading = true
			this.giftInfo = []
			this.asideBarrageList = []
			this.barrageList = []
			this.inputSM = ''
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
		},
    // 添加弹幕
    addToList (){
			if (this.isOpenDanmu) {
				this.barrageList.push({
					id: ++this.currentDanmuId,
					avatar: "@/assets/logo.png",
					msg: this.inputSM,
					barrageStyle: "normal",
					time: 5,
					type: 0,
					// position: 'bottom'
				})
			}

			if (this.isOpenAsideDanmu) {
				this.asideBarrageList.push({
					nickName: '乌拉拉',
					msg: this.inputSM,
				})
				const domDanMu = this.$refs.danmuMove

				domDanMu.scrollTo(0, domDanMu.scrollHeight + 25)
			}
		},
		// 是否开启弹幕
		switchBlock() {
			if (!this.isOpenDanmu) {
				this.barrageList = []
			}
		},
		// 调节音量
		changeVoice() {
			console.log(this.controlVoice)
		},
		// 全屏
		fullScreenControl() {
			document.querySelector('.flvVideo').requestFullscreen()
		},
		// 侧边弹幕是否屏蔽
		switchAsideBlock() {
			if (!this.isOpenAsideDanmu) {
				this.asideBarrageList = []
				this.inputSM = ''
			}
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
			height: 402px;

			.videoOptions {
				display: none;
				position: relative;
				top: -801px;
				left: 1px;
				min-height: 40px;
				min-width: 700px;
				z-index: 200;
				padding-top: 360px;
				font-size: 14px;

				.bottomOptions {
					height: 40px;
					width: 100%;
					background-color: rgba(0,0,0,.4);
					display: flex;
					align-items: center;
					justify-content: flex-end;

					.controlVoice {
						width: 100px;
						margin: 0 15px;
						color: #fff;
						display: flex;
						align-items: center;

						.voicePng {
							height: 20px;
							width: 20px;
							margin-right: 12px;
						}

						.el-slider {
							width: 100%;
						}
					}

					.closeDanmu {
						margin: 0 15px;
						height: 40px;
						display: flex;
						align-items: center;
						
						.el-switch {
							color: #fff;
						}


					}

					.fullScreen {
						display: flex;
						align-items: center;
						margin-right: 15px;

						.fullScreenPng {
							height: 20px;
							width: 20px;
							cursor: pointer;
						}
						.fullScreenPng:hover {
							transform: scale(1.1);
						}
					}
				}


			}

			.flvPlayerVideo:hover ~ .videoOptions {
				display: block;
			}

			.videoOptions:hover ~ .videoOptions {
				display: block;
			}

			.videoDanmu:hover ~ .videoOptions {
				display: block;
			}
		}
		.liveVideo:hover ~ .videoOptions, .videoOptions:hover {
				display: block;
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
			padding: 0 0 25px 0;
			margin: 10px 0;
			height: 375px;
			width: 300px;
			border-radius: 5px;
			border-top: 1px solid rgb(255, 102, 0);
			border-bottom: 1px solid rgb(255, 102, 0);
			overflow-y: scroll;
			background-color: #fff;

			.danmuBlock {
				display: flex;
				flex-direction: column;
				text-align: left;
				justify-content: flex-end;

				.danmuInfo {
					line-height: 20px;
					margin: 2.5px 5px;
					white-space:normal; 
					word-break:break-all; 
					word-wrap:break-word; 
					font-size: 14px;

					.danmuMsg {
						font-size: 13px;
					}
				}

			}
			.cleanDanmu {
				font-size: 20px;
				line-height: 400px;
				margin-bottom: -25px;
				overflow: hidden;
				text-align: center; 
				background-color: rgba(0, 0, 0, 0.1);
			}

		}

		.sendDanmu {
			padding: 10px;
			height: 78px;
			background-color: #fff;
			border-radius: 5px;
			border-top: 1px solid rgb(255, 102, 0);
			border-bottom: 1px solid rgb(255, 102, 0);
			display: flex;
			flex-direction: column;

			.sendDanmuOptions {
				height: 35px;
				line-height: 35px;
				// background-color: #e5e5e5;
				display: flex;

				.xxx {
					cursor: pointer;
					height: 25px;
					width: 25px;
				}
			}

		}
	}


}
</style>
