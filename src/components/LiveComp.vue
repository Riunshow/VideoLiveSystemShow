<template>
	<div class="liveComponents" @click="redirectTo(liveData.roomID)">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="liveData.cover" class="image">
      <div class="cardMain">
				<!-- info -->
				<div class="info">
					<div class="title">{{liveData.title}}</div>
					<div class="category">
						{{liveData.liveGroup.groupName}}
					</div>
				</div>

				<!-- count -->
				<div class="count">
					<div class="attendance">
						<i class="el-icon-view"></i>
						{{ liveData.Attendance }}
					</div>
					<div class="hot">
						<img class="hotImg" src="./../assets/hot.png" alt="hot">
						{{ liveData.hot }}
					</div>
				</div>

      </div>
    </el-card>
	</div>
</template>

<script>
export default {
	props: {
		liveData: Object,
	},
	data () {
		return {
		};
	},
	methods: {
		redirectTo(roomId) {
			this.$router.push(`/liveRoom/${roomId}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.liveComponents {
	width: 250px;
	margin: 0 10px 10px 0;

	.el-card:hover {
		box-shadow: 0 2px 12px 0 rgba(0,0,0,.3);
		cursor: pointer;
	}

	.cardMain {
		padding: 10px;
		border-radius: 10px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.info {
			display: flex;
			flex-direction: column;
			text-align: left;

			.title {
				height: 30px;
				line-height: 30px;
				max-width: 150px;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}

			.category {
				line-height: 12px;
				font-size: 13px;
				color: rgb(128, 128, 128);
			}
		}

		.count {
			height: 20px;
			line-height: 20px;
			font-size: 14px;
			display: flex;
			flex-direction: column;
			text-align: left;

			.hot {
				.hotImg {
					height: 16px;
					width: 16px;
				}
			}
		}
	}
  



  .image {
    width: 250px;
		height: 200px;
    display: block;
  }
}
</style>