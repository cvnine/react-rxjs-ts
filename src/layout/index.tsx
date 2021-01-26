import React from 'react'
import Routes from '@/route'
import { LayoutWrap, Header, Footer } from './style'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/theme'
import { ModalRender } from '@/components'

const Layout = () => {
	return (
		<ThemeProvider theme={theme}>
			<LayoutWrap>
				<Header>header</Header>
				<section className="wrap-content">
					<ModalRender>
						<Routes />
					</ModalRender>
				</section>
				<Footer>footer</Footer>
			</LayoutWrap>
		</ThemeProvider>
	)
}

export default Layout
