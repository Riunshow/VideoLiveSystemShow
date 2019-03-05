<template>
	<div class="header">
		<!-- logo -->
		<div class="logo">
			<img src="../../static/image/common/logo-l.png" alt="logo">
		</div>

	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { checkPhone } from '@/utils/common.js'
import pathname from '@/config/pathName'

export default {
	name: "headNav",
	data () {
		return {

		};
	},
	created() {

	},
	mounted() {
		
	},
	computed: {

	},
	methods: {
	}
}
</script>

<style lang="scss" scoped>
.header {
	padding: 0 50px 0 30px;
	color: #333;
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	.logo {
		img {
			// height: 70px;
			width: 50px;
		}
	}

}
</style>