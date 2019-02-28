<template>
	<div class="all-category" v-loading="loading">
		<div class="category-info" v-for="(item, index) in menuList" :key="index" @click="redirectTo(item.liveGroupId)">
			<div class="groupAvatarImg">
				<img :src="item.groupAvatar" class="groupAvatar" />
			</div>
			<div class="groupName">{{ item.groupName }}</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

export default {
	data () {
		return {
		};
	},
	async created () {
		await this.getMenuList()
	},
	computed: {
		...mapState('indexPage', ['menuList', 'loading'])		
	},
	methods: {
		...mapActions('indexPage', ['getMenuList']),
		redirectTo(cateId) {
			this.$router.push(`/liveRoomByCate/${cateId}`)
		}
	}
}
</script>

<style lang="scss" scoped>
.all-category {
	padding: 15px 30px;
	display: flex;
	flex-wrap: wrap;

	.category-info {
		margin: 10px 15px 10px 0;
		background-color: #fff;
		height: 240px;
		width: 150px;
		
		.groupAvatarImg {
			width: 100%;
			height: 200px;

			.groupAvatar {
				width: 100%;
				height: 100%;
			}
		}

		.groupName {
			height: 40px;
			line-height: 40px;
			font-size: 14px;
			color: #333;
			text-align: center;
			transition: all .25s;
		}

	}
	.category-info:last-child {
		margin-right: 0;
	}
	.category-info:hover {
		cursor: pointer;
		background-color: #ff7b00;
		transition: all .5s;
	}
}
</style>