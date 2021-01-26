import { fetchGetDetail } from '@/api'
import React, { useEffect } from 'react'
import { Wrap } from './style'

const Home = () => {
	useEffect(() => {
		fetchGetDetail()
	}, [])

	return <Wrap>home</Wrap>
}

export default Home
