<template>
	<div class="liveRoomByCate" v-loading="loading">
		<div class="main" v-if="liveList.length !== 0">
			<live-comp
				v-for="(item, index) in liveList"
				:liveData="item"
				:key="index"
			/>
		</div>
		<div class="none" v-else>
			暂时没有主播正在直播哦~
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import LiveComp from './../../components/LiveComp'

export default {
	components: {
		LiveComp
	},
	data () {
		return {
		};
	},
	async created () {
		await this.getLiveListByGroupId({
			live_group_id: this.$route.params.cateId
		})
	},
	computed: {
		...mapState('indexPage', ['liveList', 'loading'])
	},
	methods: {
		...mapActions('indexPage', ['getLiveListByGroupId'])
	}
}
</script>

<style lang="scss" scoped>
.liveRoomByCate {
	padding: 15px 30px;

	.main {
		display: flex;
		flex-wrap: wrap;
	}
	.none {
		line-height: 20px;
		margin: 100px auto;
	}
}
</style>