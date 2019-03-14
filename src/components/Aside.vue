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

		<!-- 菜单项 -->
		<div class="asideMenu">
			<!-- 菜单 -->
			<el-menu 
				:default-active="this.$route.path"
				class="el-menu-vertical-demo" 
				@open="handleOpen" 
				@close="handleClose" 
				:collapse="isCollapse"
				background-color="#2c2c2c"
				text-color="#fff"
				active-text-color="#f60"
				:collapse-transition="false"
				:router="true"
			>
				<el-menu-item index="/">
					<i class="el-icon-menu"></i>
					<span slot="title">全部直播</span>
				</el-menu-item>
				<el-menu-item index="/allCategory">
					<i class="el-icon-document"></i>
					<span slot="title">全部分类</span>
				</el-menu-item>
				<el-menu-item index="/3">
					<i class="el-icon-setting"></i>
					<span slot="title">人气排行</span>
				</el-menu-item>
				<el-menu-item index="/wanted">
					<i class="el-icon-setting"></i>
					<span slot="title">主播招募</span>
				</el-menu-item>
			</el-menu>
		</div>

		<!-- 登录注册 -->
		<!-- userinfo -->
		<div class="userInfo" v-if="!userInfo">
			<div class="userinfoOpt" v-if="!isCollapse">
				<div class="userInfo">
					<el-button @click="dialogLogin = true" class="loginBtn activeBtn" size="mini" round>登录</el-button>
					<el-button @click="dialogRegist = true" class="registBtn" size="mini" round>注册</el-button>
				</div>
			</div>
			<div class="userinfoOptCol" v-else>
				<div class="userInfo">
					<el-button @click="dialogLogin = true" class="loginBtn activeBtn" size="mini" round>登录</el-button>
					<el-button @click="dialogRegist = true" class="registBtn" size="mini" round>注册</el-button>
				</div>
			</div>
		</div>

		<div class="userHasLogin" v-else>
			<div class="userInfo" v-if="!isCollapse">
				<el-popover
					placement="right"
					width="250"
					trigger="hover">
					<div class="userMoreInfo">
						<div class="userMoreOptions">
							<div>
								身份<el-tag>{{userInfo.roleName}}</el-tag>
							</div>
							<span>余额 {{userInfo.balance}}</span>
							<span>送礼记录</span>
						</div>
					</div>

					<div slot="reference">
						<img class="userAvatar" :src="userInfo.avatar">
					</div>
				</el-popover>
				<span class="userName">{{ userInfo.nickname }}</span>
				<el-button class="logout" type="text" @click="logout">退出登录</el-button>
			</div>
			<div class="userInfoCol" v-else>
				<img class="userAvatar" :src="userInfo.avatar">
			</div>
		</div>

		<!-- 登录弹出框 -->
		<el-dialog title="登录" :visible.sync="dialogLogin" width="400px" :show-close="false" :close-on-click-modal="false">
			<el-input placeholder="请输入手机号码" v-model="login.phone">
				<i slot="prepend" class="el-icon-mobile-phone"></i>
			</el-input>
			<el-input placeholder="请输入密码" v-model="login.pwd" :type="showPwd ? 'text' : 'password'" @keyup.enter.native="loginMethod">
				<i slot="prepend" @click="showPwd = !showPwd" :class="showPwd ? 'el-icon-star-off' : 'el-icon-star-on'"></i>
			</el-input>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="loginMethod">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 注册弹出框 -->
		<el-dialog title="注册" :visible.sync="dialogRegist" width="400px" :show-close="false" :close-on-click-modal="false">
			<el-input placeholder="请输入手机号码" v-model="regist.phone">
				<i slot="prepend" class="el-icon-mobile-phone"></i>
			</el-input>
			<div class="getSmscode">
				<el-input class="inputSmscode" placeholder="请输入验证码" v-model="regist.code">
					<i slot="prepend" class="el-icon-message"></i>
				</el-input>
				<el-button size="mini" round @click="getSmsCodeFn" :disabled="canClickGetSmscode">{{ msg }}</el-button>
			</div>
			<el-input placeholder="请输入昵称" v-model="regist.nickname">
				<i slot="prepend" class="el-icon-edit"></i>
			</el-input>
			<el-input placeholder="请输入密码" v-model="regist.pwd" :type="showPwd ? 'text' : 'password'">
				<i slot="prepend" @click="showPwd = !showPwd" :class="showPwd ? 'el-icon-star-off' : 'el-icon-star-on'"></i>
			</el-input>
			<el-input placeholder="请再次输入密码" @keyup.enter.native="registMethod" v-model="regist.againpwd" :type="showPwd ? 'text' : 'password'">
				<i slot="prepend" @click="showPwd = !showPwd" :class="showPwd ? 'el-icon-star-off' : 'el-icon-star-on'"></i>
			</el-input>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="registMethod">确 定</el-button>
			</div>
		</el-dialog>


	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { checkPhone } from '@/utils/common.js'
import pathname from '@/config/pathName'

export default {
	name: "asideNav",
	data () {
		return {
			isCollapse: false,
			search: '',
			// userinfo ----- start
			dialogLogin: false,
			dialogRegist: false,
			formLabelWidth: '120px',
			login: {
				phone: '',
				pwd: ''
			},
			regist: {
				phone: '',
				code: '',
				nickname: '',
				pwd: '',
				againpwd: '',
			},
			showPwd: false,
			userInfo: null,
			// userinfo ----- end
		};
	},
	async created() {
		this.changeRoleName()
	},
	computed: {
		...mapState('user', ['canClickGetSmscode']),
		...mapGetters('user', ['msg']),
	},
	methods: {
		...mapActions('user', ['getSmsCode']),
		// change role name
		changeRoleName() {
			if (JSON.parse(sessionStorage.getItem('userInfo'))) {
				this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
				switch (this.userInfo.role) {
					case 3:
						this.userInfo.roleName = '管理员'
						break;
					case 2:
						this.userInfo.roleName = '主播'
						break;
					case 1:
						this.userInfo.roleName = '普通用户'
						break;
					default:
						break;
				}
			}
		},
		// 登录
		async loginMethod() {
			const { phone, pwd } = this.login
			this.dialogLogin = true
			const params = {
				useraccount: phone,
				password: pwd
			}
			const result = await this.$request(pathname.LOGIN, 'post', params)
			if (result.success) {
				this.dialogLogin = false
				this.$notify({
          title: '登录成功',
          message: `欢迎您, ${result.data.user.role === 1 ? '主播' : '用户' } ${result.data.user.nickname}`,
          type: 'success'
        })
				sessionStorage.setItem('userInfo', JSON.stringify(result.data.user))
				this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
				this.changeRoleName()
			}else {
				this.$message.error(result.msg)
			}
		},
		// 发送短信验证码
		async getSmsCodeFn() {
			const { phone } = this.regist
			if (phone) {
				const isPhoneNum = checkPhone(phone)
				if (isPhoneNum) {
					const params = {
						phoneNum: phone
					}
					const result = await this.getSmsCode(params)
					if (result.success) {
						this.$message(result.msg)
					}else {
						this.$message.error(result.msg)
					}
				}else {
					this.$message.error('请输入正确的电话号码')
				}
			}else {
				this.$message.error('电话号码不能为空')	
			}
		},
		// 注册
		async registMethod() {
			const { phone, code, nickname, pwd, againpwd } = this.regist
			if (!phone && !code && !nickname && !pwd && !againpwd) {
				this.$message.error('输入框不能为空')
			}else if (pwd !== againpwd) {
				this.$message.error('两次密码不一致')
			}else {
				this.dialogRegist = true
				const params = {
					useraccount: phone,
					smscode: code,
					password: pwd,
					nickname,
					avatar: 'https://avatars0.githubusercontent.com/u/19502268?s=40&v=4'
				}
				const data = await this.$request(pathname.REGISTER, 'post', params)
				if (data.success) {
					this.cancel()
					this.$notify({
						title: '注册成功',
						message: '',
						type: 'success'
					});
				}else {
					this.$message.error(data.msg)
				}
			}
		},
		// 退出
		async logout() {
			const result = await this.$request(pathname.LOGOUT, 'get')
			if (result.success) {
				this.$notify({
          title: result.msg,
          message: '',
          type: 'success'
        });
				sessionStorage.removeItem('userInfo')
				this.userInfo = null
			}
		},
		cancel() {
			this.dialogLogin = false
			this.dialogRegist = false
			this.showPwd = false

			this.regist = {
				phone: '',
				code: '',
				nickname: '',
				pwd: '',
				againpwd: '',
			}
			this.login = {
				phone: '',
				pwd: ''
			}
		},
		// 侧边栏收缩隐藏
		changeShow() {
			this.isCollapse = !this.isCollapse
		},
		// 获取侧边栏分类
		async getCategoryList() {

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
	color: #f2f2f3;

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
		height: 450px;
		min-height: 30vh;
		max-height: 60vh;
		overflow: scroll;
		border-top: 1px solid #f60;
		border-bottom: 1px solid #f60;

		.el-menu {
			border: none;
		}

		.el-menu-vertical-demo:not(.el-menu--collapse) {
			width: 200px;
			height: 400px;
		}
	}

	.userinfoOpt {
		margin-top: 8vh;

		.userInfo {
			display: flex;
			justify-content: center;

			.el-button {
				width: 40%;
				background-color: #2c2c2c;
				color: #f2f2f3;
			}
			.activeBtn {
				color: #f60;
				border: 1px solid #f60;
			}
			.registBtn:hover {
				border: 1px solid #b2b4c4;
				background-color: #b2b4c4;
			}
			.loginBtn:hover {
				color: #f2f2f3;
				border: 1px solid #f60;
				background-color: #f60;
			}
		}
	}

	.userinfoOptCol {
		width: 64px;
		height: 100px;
		margin-top: 25px;

		.userInfo {
			height: 100px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.el-button {
				width: 90%;
				background-color: #2c2c2c;
				color: #f2f2f3;
				margin: 0;
			}
			.activeBtn {
				color: #f60;
				border: 1px solid #f60;
			}
			.registBtn {
				margin-top: 20px;
			}
			.registBtn:hover {
				border: 1px solid #b2b4c4;
				background-color: #b2b4c4;
			}
			.loginBtn:hover {
				color: #f2f2f3;
				border: 1px solid #f60;
				background-color: #f60;
			}
		}
	}

	.userHasLogin {

		.userInfo {
			height: 150px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-around;
			margin-top: 15px;

			.userAvatar{
				height: 50px;
				width: 50px;
				border-radius: 25px;
			}

			.userName {
				cursor: pointer;
				height: 30px;
				line-height: 30px;
			}
		}

		.userInfoCol {
			display: flex;
			justify-content: center;
			margin-top: 25px;

			.userAvatar{
				height: 50px;
				width: 50px;
				border-radius: 25px;
			}
		}

	}

	.el-dialog {

		.getSmscode {

			.inputSmscode {
				width: 255px;
			}
		}
	}

	.dialog-footer {
		text-align: center;
	}
	.el-input {
    // width: 180px;
		margin-bottom: 15px;
	}

}

.userMoreInfo {
	.userMoreOptions {
		display: flex;
		flex-direction: column;
	}

}
</style>