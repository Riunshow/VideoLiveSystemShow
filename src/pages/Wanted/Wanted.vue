<template>
  <div class="wanted">
    主播招募
    <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      };
		},
		methods: {
			submitForm(formName) {
				console.log(formName);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
		}
  }
</script>

<style lang="scss" scoped>
.wanted {
	width: 500px;
	margin: 0 auto;
}
</style>