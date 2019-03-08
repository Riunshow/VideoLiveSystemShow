<template>
	<div class="giftComp">
		<el-popover
			placement="top-start"
			width="150"
			trigger="hover">
			<div class="giftInfo">
				<div class="giftImg">
					<img class="giftAvatar" :src="giftInfo.giftAvatar" alt="">
				</div>
				<div class="info">
					<span>{{giftInfo.giftName}}</span>
					<span>{{giftInfo.price}}积分</span>
				</div>
			</div>
			<div slot="reference">
				<img @click="sendGift" class="bigAvatar" :src="giftInfo.giftAvatar" alt="">
			</div>
		</el-popover>
	</div>
</template>

<script>
export default {
	props: {
		giftInfo: Object
	},
	data () {
		return {
		};
	},
	methods: {
		sendGift() {
			this.$emit('getSendGiftId', this.giftInfo.giftId)
		}
	}
}
</script>

<style lang="scss" scoped>
.giftComp {
	height: 50px;

}
	.giftInfo {
		height: 150px;
		width: 150px;
		display: flex;
		align-items: center;
		flex-direction: column;

		.giftImg {

			.giftAvatar {
				height: 100px;
				width: 100px;
			}
		}
		.info {
			display: flex;
			flex-direction: column;

			span {
				margin-bottom: 5px;
			}
		}
	}
	.bigAvatar {
		height: 50px;
		width: 50px;
		border-radius: 10px;
	}
</style>