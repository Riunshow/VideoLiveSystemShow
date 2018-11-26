<template>
	<div class="header">
		<div v-if="!userInfo">
			<el-button type="text" @click="dialogRegist = true">注册</el-button>
			<el-button type="text" @click="dialogLogin = true">登录</el-button>
		</div>

		<div v-else>
			头像 <img :src="userInfo.avatar">
			昵称 <span>{{ userInfo.nickname }}</span>
			<el-button type="text" @click="logout">退出</el-button>
		</div>

		<!-- 登录弹出框 -->
		<el-dialog title="登录" :visible.sync="dialogLogin">
			<el-form :model="login">
				<el-form-item label="用户名(邮箱)" :label-width="formLabelWidth">
					<el-input v-model="login.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input v-model="login.pwd" autocomplete="off"></el-input>					
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="loginMethod">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 注册弹出框 -->
		<el-dialog title="注册" :visible.sync="dialogRegist">
			<el-form :model="regist">
				<el-form-item label="用户名(邮箱)" :label-width="formLabelWidth">
					<el-input v-model="regist.email" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="密码" :label-width="formLabelWidth">
					<el-input v-model="regist.pwd" autocomplete="off"></el-input>					
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="registMethod">确 定</el-button>
			</div>
		</el-dialog>

	</div>
</template>

<script>
import pathname from '@/config/pathName'

export default {
	name: "headNav",
	data () {
		return {
			dialogLogin: false,
			dialogRegist: false,
			formLabelWidth: '120px',
			login: {
				email: '',
				pwd: ''
			},
			regist: {
				email: '',
				pwd: ''
			},
			userInfo: null
		};
	},
	created() {
		if (JSON.parse(sessionStorage.getItem('userInfo'))) {
			this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
		}
	},
	methods: {
		/*
		 zbt@qq.com
		 123
		 */
		async loginMethod() {
			const { email, pwd } = this.login
			this.dialogLogin = true
			const params = {
				username: email,
				password: pwd,
				rememberMe: false
			}
			const result = await this.$request(pathname.LOGIN, 'post', params)
			if (!result.error) {
				this.dialogLogin = false
				// this.$message({
        //   message: '登录成功',
        //   type: 'success'
				// });
				sessionStorage.setItem('userInfo', JSON.stringify(result.data.user))
				this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
				console.log(this.userInfo)
			}
		},
		async registMethod() {
			const { email, pwd } = this.regist
			this.dialogRegist = true
			const params = {
				username: email,
				password: pwd,
				nickname: 'nickname',
				avatar: 'https://avatars0.githubusercontent.com/u/19502268?s=40&v=4'
			}
			const data = await this.$request(pathname.REGISTER, 'post', params)
			if (!data.error) {
				this.dialogRegist = false
				this.$message({
          message: '注册成功',
          type: 'success'
        });
			}
		},
		async logout() {
			const data = await this.$request(pathname.LOGOUT, 'get')
			if (!data.error) {
				// this.$message({
        //   message: '退出成功',
        //   type: 'success'
				// });
				sessionStorage.removeItem('userInfo')
				this.userInfo = null
			}
		},
		cancel() {
			this.dialogLogin = false
			this.dialogRegist = false

		}
	}
}
</script>

<style lang="scss" scoped>

</style>