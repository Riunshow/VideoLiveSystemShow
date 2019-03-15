<template>
  <div class="wanted">
		<h1>主播招募</h1>

		<div class="stepsDiv">
			<el-steps :active="active" finish-status="success" align-center>
				<el-step title="填写基本信息"></el-step>
				<el-step title="审核中"></el-step>
				<el-step title="审核通过"></el-step>
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
					<el-button type="primary" @click="submitForm" :disabled="isLive">立即申请</el-button>
					<el-button @click="resetForm" :disabled="isLive">重置</el-button>
				</el-form-item>
			</el-form>
		</div>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

  export default {
    data() {
      return {
				active: 0,
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
			...mapActions('live', ['getWantedStatus', 'sendApplication']),
			async fetchData() {
				await this.getWantedStatus(JSON.parse(sessionStorage.getItem('userInfo')).id)
				if (this.wantedInfo) {
					this.isLive = true
					this.active = this.wantedInfo.status
					this.form.name = this.wantedInfo.realName
					this.form.idCardNum = this.wantedInfo.idCardNum
				}
			},
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
      resetForm(formName) {
        this.$refs.form.resetFields();
      }
		}
  }
</script>

<style lang="scss" scoped>
.wanted {
	width: 500px;
	margin: 0 auto;

	h1 {
		font-size: 25px;
		text-align: center;
	}

	.stepsDiv {
		margin: 15px 0;
	}
	.inputInfo {
		margin-top: 20px;
	}
}
</style>