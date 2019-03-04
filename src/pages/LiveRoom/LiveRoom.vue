<template>
	<div class="liveRoom">
		<div class="liveRoomInfo">
			<div class="title">
				<!-- 头像 -->
				<div class="avatarImg">
					<img v-if="!liveInfo.user.avatar" v-avatar="liveInfo.user.nickname" width="150" height="150" />
					<img v-else :src="liveInfo.user.avatar" width="150" height="150" />
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
			<div class="gift">
				gift
			</div>
		</div>
		<div class="danmu">
			danmu
		</div>
	</div>
</template>

<script>
import FlvPlayer from '@/components/FlvVideo'
import Baberrage from '@/components/Baberrage'
import { mapState, mapActions } from 'vuex';

export default {
  components: {
    FlvPlayer,
    Baberrage
  },
	data () {
		return {
		};
	},
	async created () {
		await this.getLiveInfoByRoomId(this.$route.params.roomId)
	},
	computed: {
		...mapState('live', ['liveInfo'])
	},
	methods: {
		...mapActions('live', ['getLiveInfoByRoomId'])
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
			height: 150px;
			width: 100%;
			background-color: #fff;
			border: 1px solid #e5e5e5;
			display: flex;

			.avatarImg {

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

		.gift {
			height: 100px;
			width: 100%;
			background-color: aquamarine;
		}
	}

	.danmu {
		width: 300px;
		height: 650px;
		background-color: bisque;
	}


}
</style>