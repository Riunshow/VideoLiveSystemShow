<template>
	<div class="header">
		<!-- logo -->
		<div class="logo">
			<img src="@/assets/logo.png" alt="logo">
		</div>

		<!-- userinfo -->
		<div class="userInfo" v-if="!userInfo">
			<el-button type="text" @click="dialogRegist = true">注册</el-button>
			<el-button type="text" @click="dialogLogin = true">登录</el-button>
		</div>

		<div class="userInfo" v-else>
			<img class="userAvatar" :src="userInfo.avatar">
			<el-dropdown>
				<span class="el-dropdown-link">
					<span class="userName">{{ userInfo.nickname }}</span>
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item><el-button type="text" @click="logout">退出</el-button></el-dropdown-item>
					<el-dropdown-item><el-button type="text" @click="logout">退出</el-button></el-dropdown-item>
					<el-dropdown-item><el-button type="text" @click="logout">退出</el-button></el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>

		<!-- 登录弹出框 -->
		<el-dialog title="登录" :visible.sync="dialogLogin" width="400px" :show-close="false" :close-on-click-modal="false">
			<el-input placeholder="请输入手机号码" v-model="login.phone">
				<i slot="prepend" class="el-icon-mobile-phone"></i>
			</el-input>
			<el-input placeholder="请输入密码" v-model="login.pwd" :type="showPwd ? 'text' : 'password'">
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
			<el-input placeholder="请再次输入密码" v-model="regist.againpwd" :type="showPwd ? 'text' : 'password'">
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
	name: "headNav",
	data () {
		return {
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
			userInfo: null
		};
	},
	created() {
		if (JSON.parse(sessionStorage.getItem('userInfo'))) {
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
		}
	},
	mounted() {
		
	},
	computed: {
		...mapState('user', ['canClickGetSmscode']),
		...mapGetters('user', ['msg'])
	},
	methods: {
		...mapActions('user', ['getSmsCode']),
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
		}
	}
}
</script>

<style lang="scss" scoped>
.header {
	padding: 0 50px 0 50px;
	color: #333;
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	.logo {
		img {
			height: 30px;
			width: 30px;
		}
	}

	.userInfo {
		display: flex;
		align-items: center;
		height: 64px;

		.el-dropdown {
			color: #333 !important;
		}

		.userAvatar{
			height: 30px;
			width: 30px;
			border-radius: 15px;
			margin-right: 15px;
		}

		.userName {
			cursor: pointer;
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
</style>