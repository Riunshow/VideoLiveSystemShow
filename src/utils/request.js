import axios from 'axios'

// const base_url = 'http://localhost:8080'
const base_url = ''

export default async function request (url, method, data = {}) {
	try {
		const response = await axios({ method, url: base_url + url, data })
		if (response.data.error) {
			throw Error(response.data.data)
		}
		return response.data
	} catch (e) {
		this.$notify.error({
			title: '请求错误',
			message: e.message
		});
	}
	
}