<template>
	<div class="asideNav">

		<!-- logo -->
		<div class="logo">
			<img v-if="!isCollapse" class="showLogo" src="./../../static/image/common/logo-l.png" alt="">
			<img v-else class="hiddenLogo" src="./../../static/image/common/logo-l.png" alt="">
		</div>
		<!-- 搜索框 -->
		<div class="searchInput" v-if="!isCollapse">
			<input type="text" placeholder="搜游戏/主播" v-model="search">
			<a class="searchA">
				<i class="el-icon-search"></i>
			</a>
		</div>
		<!-- 展开收起按钮 -->
		<div class="changeShow" @click="changeShow" v-if="isCollapse">
		</div>
		<div class="changeHidden" @click="changeShow" v-else>
		</div>

		<div class="asideMenu">
			<!-- 菜单 -->
			<el-menu 
				default-active="1-4-1"
				class="el-menu-vertical-demo" 
				@open="handleOpen" 
				@close="handleClose" 
				:collapse="isCollapse"
				background-color="#2c2c2c"
				text-color="#fff"
				active-text-color="#f60"
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
	</div>
</template>

<script>
export default {
	name: "asideNav",
	data () {
		return {
			isCollapse: false,
			search: ''
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
	
	.logo {
		height: 64px;
		text-align: center;
		padding: 20px 0 0;

		.showLogo {
			height: 70px;
			width: 50px;
		}

		.hiddenLogo {
			height: 50px;
			width: 30px;
		}

	}
	
	.searchInput {
		padding: 20px 0 10px;
		height: 26px;
    margin: 0 auto;
    position: relative;
		width: 160px;
		
		input {
			background: #e8e8e8;
			color: #6e7081;
			border-radius: 100px;
			border: none;
			display: block;
			font-size: 12px;
			outline: 0;
			width: 140px;
			height: 25px;
			line-height: 25px;
			padding: 0 10px;
		}

		.searchA {
			display: block;
			width: 22px;
			height: 25px;
			line-height: 25px;
			position: relative;
			top: -25px;
			left: 140px;
			color: #6e7081;
		}
	}

	.changeShow {
		position: fixed;
		left: 64px;
		top: 50%;
		margin-top: -75px;
		width: 15px;
    height: 150px;
		background: url(../../static/image/common/side-left-shrink.png) no-repeat;
		background-position: 0 -151px;
		cursor: pointer;
	}
	.changeShow:hover {
		cursor: pointer;
		background-position: -22px -151px;
	}

	.changeHidden {
		width: 15px;
    height: 150px;
		position: fixed;
		left: 200px;
		top: 50%;
		margin-top: -75px;
		background: url(../../static/image/common/side-left-shrink.png) no-repeat;
		cursor: pointer;
	}
	.changeHidden:hover {
		background-position: -22px 0;
		cursor: pointer;
	}

	.asideMenu {
		height: 500px;
		overflow: scroll;
		border-top: 1px solid #f60;
		border-bottom: 1px solid #f60;

		.el-menu {
			border: none;
		}

		.el-menu-vertical-demo:not(.el-menu--collapse) {
			width: 200px;
			min-height: 400px;
		}
	}
}
</style>