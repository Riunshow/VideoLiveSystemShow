<template>
	<div v-loading="loading">
		<el-upload class="avatar-uploader" 
			:action="uploadHost" 
			:show-file-list="false"
		 	:on-success="handleSuccess" 
			:on-error="handleError"
			:before-upload="beforeUpload"
			:data="ossConfig"
		>
			<img v-if="imageUrl" :src="imageUrl" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
</template>

<script>
	export default {
		name: "upload",
		data() {
			return {
				loading: false,
				imageUrl: '',
				uploadHost: 'https://admin-manage.oss-cn-hangzhou.aliyuncs.com',
				ossConfig: {
					key: '',
  				success_action_status: '200',
				}
			};
		},
		async created() {
			await this.getToken()
		},
		methods: {
			// 获取服务器端生成的签名
			async getToken() {
				const result = await this.$request('/api/common/uploadToken')
				Object.assign(this.ossConfig, result.data)
			},
			// 生成随机字符串
			randomString() {
				return (new Date % 9e6).toString(36) + Math.random().toString(36).substring(2, 7)
			},
			// 上传前拦截
			beforeUpload(file) {
				this.loading = true
				const isLt2M = file.size / 1024 / 1024 < 2
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				this.ossConfig.key = `img/${this.randomString()}.${file.type.split('/').pop()}`				
				return isLt2M;
			},
			// 上传成功
			handleSuccess(res, file) {
				this.imageUrl = this.uploadHost + '/' + this.ossConfig.key
				console.info(this.imageUrl)
				this.$emit('getImgUrl', this.imageUrl)
				this.loading = false
			},
			// 上传失败
			handleError(err, file) {
				this.$message.error(err)
				this.loading = false
			}
		}
	}
</script>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>