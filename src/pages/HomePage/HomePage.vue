<template>
	<div class="homePage">
		<div class="main" v-loading="loading">
			<live-comp 
				v-for="(item, index) in liveList"
				:liveData="item"
				:key="index"
			/>
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
		display: flex;
		flex-wrap: wrap;
	}
}
</style>