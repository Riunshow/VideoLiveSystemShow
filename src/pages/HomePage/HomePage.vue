<template>
	<div class="homePage">
		<div class="main" v-loading="loading">
			<div class="has" v-if="liveList.length !== 0">
				<live-comp 
					v-for="(item, index) in liveList"
					:liveData="item"
					:key="index"
				/>
			</div>
			<div class="none" v-else>
				暂时没有更多直播
			</div>
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
		await this.getLiveList()
	},
	computed: {
		...mapState('indexPage', ['liveList', 'loading'])
	},
	methods: {
		...mapActions('indexPage', ['getLiveList']),
	}
}
</script>

<style lang="scss" scoped>
.homePage {
	padding: 15px 30px;

	.main {
		.has {
			display: flex;
			flex-wrap: wrap;
		}
		
		.none {
			height: 200px;
			line-height: 200px;
			margin: 0 auto;
		}
	}
}
</style>