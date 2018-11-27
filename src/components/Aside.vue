<template>
	<div class="asideNav">

		<div class="changeIcon">
			<i class="el-icon-arrow-right" @click="changeShow" v-if="isCollapse"></i>
			<div class="arrow-left-icon" @click="changeShow" v-else>
				<i class="el-icon-arrow-left"></i>
				<span>收起菜单</span>
			</div>
		</div>

		<div class="changeShow" @click="changeShow" v-if="isCollapse">
			<i class="el-icon-arrow-right" ></i>
		</div>
		<div class="changeHidden" @click="changeShow" v-else>
			<i class="el-icon-arrow-left"></i>
		</div>

		<!-- 菜单 -->
		<el-menu 
			default-active="1-4-1"
			class="el-menu-vertical-demo" 
			@open="handleOpen" 
			@close="handleClose" 
			:collapse="isCollapse"
			background-color="#191b2e"
      text-color="#fff"
      active-text-color="#ffd04b"
			:collapse-transition="false"
		>
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-location"></i>
					<span slot="title">导航一</span>
				</template>
				<el-menu-item-group>
					<span slot="title">分组一</span>
					<el-menu-item index="1-1">选项1</el-menu-item>
					<el-menu-item index="1-2">选项2</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group title="分组2">
					<el-menu-item index="1-3">选项3</el-menu-item>
				</el-menu-item-group>
				<el-submenu index="1-4">
					<span slot="title">选项4</span>
					<el-menu-item index="1-4-1">选项1</el-menu-item>
				</el-submenu>
			</el-submenu>
			<el-menu-item index="2">
				<i class="el-icon-menu"></i>
				<span slot="title">导航二</span>
			</el-menu-item>
			<el-menu-item index="3" disabled>
				<i class="el-icon-document"></i>
				<span slot="title">导航三</span>
			</el-menu-item>
			<el-menu-item index="4">
				<i class="el-icon-setting"></i>
				<span slot="title">导航四</span>
			</el-menu-item>
		</el-menu>
	</div>
</template>

<script>
export default {
	name: "asideNav",
	data () {
		return {
			isCollapse: false
		};
	},
	methods: {
		changeShow() {
			this.isCollapse = !this.isCollapse
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
	}
}
</script>

<style lang="scss" scoped>
.asideNav {
	
	.changeShow {
		background-color: #191b2e;
		position: absolute;
		left: 64px;
		height: 50px;
		width: 20px;

		// border-width:37px 0 37px 100px;
		// border-style:solid solid solid solid;
		// border-color:transparent transparent red;
	}

	.changeHidden {
		height: 50px;
		width: 20px;
		background-color: #191b2e;
		position: absolute;
		left: 200px;

		// width:18px;
		// height:0;
		// border-top: 18px solid #191b2e;
		// border-right: 20px solid transparent;
		// border-left:20px solid transparent;
		// transform:rotate(270deg)
	}

	.changeIcon {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 15px 0;

		.el-icon-arrow-right, .arrow-left-icon {
			cursor: pointer;
		}

		.arrow-left-icon {
			padding-left: 20px;
			margin-right: 5px;
			width:205px;
			font-size: 14px;

			i {
				font-size: 18px;
				margin-right: 5px;
				width: 24px;
				text-align: center;
				font-size: 18px;
				color: #b2b4c4;
			}
		}
	}

	.el-menu {
		border: none;
	}

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 200px;
		min-height: 400px;
	}
}
</style>