<template>
  <div class="wanted">
		<h1>主播招募</h1>

		<div class="stepsDiv">
			<el-steps :active="active" finish-status="success" :process-status="stepStatus"  align-center>
				<el-step title="填写基本信息"></el-step>
				<el-step title="审核中"></el-step>
				<el-step v-if="this.wantedInfo.status != -1" title="审核通过"></el-step>
				<el-step v-else title="审核未通过"></el-step>				
			</el-steps>
		</div>

		<div class="inputInfo">
			<el-form :model="form" ref="form" label-width="100px">
				<el-form-item label="真实姓名" prop="name">
					<el-input v-model="form.name" :disabled="isLive"></el-input>
				</el-form-item>
				<el-form-item label="身份证号" prop="name">
					<el-input v-model="form.idCardNum" :disabled="isLive"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button v-if="this.wantedInfo.status != -1" type="primary" @click="submitForm" :disabled="isLive">立即申请</el-button>
					<el-button v-else type="primary" @click="submitFormAgain" :disabled="isLive">重新申请</el-button>
					<el-button @click="resetForm" :disabled="isLive">重置</el-button>
				</el-form-item>
			</el-form>
		</div>

		<div class="isSuccess" v-if="this.wantedInfo.status == 3">
			恭喜您申请通过，可以去开启直播了!!
		</div>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    data() {
      return {
				active: 0,
				stepStatus: 'process',
        form: {
					name: '',
					idCardNum: '',
				},
				isLive: false
      };
		},
		async created () {
			await this.fetchData()
		},
		computed: {
			...mapState('live', ['wantedInfo'])
		},
		methods: {
		...mapActions('user', ['getUserById']),
			...mapActions('live', ['getWantedStatus', 'sendApplication', 'sendApplicationAgain']),
			async fetchData() {
				await this.getWantedStatus(JSON.parse(sessionStorage.getItem('userInfo')).id)
				if (this.wantedInfo) {
					if (this.wantedInfo.status != -1) {
						this.isLive = true
						this.active = this.wantedInfo.status
						this.stepStatus = 'process'
						await this.getUserById(JSON.parse(sessionStorage.userInfo).id)
					}else {
						this.stepStatus = 'error'
						this.active = 2
					}
					this.form.name = this.wantedInfo.realName
					this.form.idCardNum = this.wantedInfo.idCardNum
				}

			},
			// 发起申请
			async submitForm() {
				const options = {
					user_id: JSON.parse(sessionStorage.getItem('userInfo')).id,
					realName: this.form.name, 
					idCardNum: this.form.idCardNum
				}
				const result = await this.sendApplication(options)
				if (result.success) {
					this.$message.success(result.msg)
					await this.fetchData()
				}
			},
			// 重新申请
			async submitFormAgain() {
				const options = {
					user_id: JSON.parse(sessionStorage.getItem('userInfo')).id,
					realName: this.form.name, 
					idCardNum: this.form.idCardNum
				}
				const result = await this.sendApplicationAgain(options)
				if (result.success) {
					this.$message.success(result.msg)
					await this.fetchData()
				}
			},
			// 重置
      resetForm(formName) {
        this.$refs.form.resetFields();
      }
		}
  }
</script>

<style lang="scss" scoped>
.wanted {
	width: 500px;
	margin: 100px auto;

	h1 {
		font-size: 25px;
		text-align: center;
		margin-bottom: 50px;
	}

	.stepsDiv {
		margin: 15px 0;
	}
	.inputInfo {
		margin-top: 20px;
	}

	.isSuccess {
		text-align: center;
		margin-top: 50px;
		font-size: 25px;
		color: #67C23A;
	}
}
</style>