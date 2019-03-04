import axios from 'axios'

export default async function request (url, method = 'GET', data = {}) {

	try {
		const response = await axios({ method, url, data })
		if (!response.data.success) {
			this.$message.error(response.data.msg)
		}
		
		return response.data
	} catch (e) {
		return {
			success: false
		}
	}
}