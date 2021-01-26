import fetchAxios from '@/plugins/axios'

export const fetchGetDetail = () =>
	fetchAxios.get(`/home`).then((res) => {
		console.log(res)
		return res
	})
