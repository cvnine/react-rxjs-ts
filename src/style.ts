import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    body, html, * {
        margin:0;
        padding:0;
    }
	
    body, html {
        width:100%;
        height:100%;
        font-family: "microsoft yahei",微软雅黑;
    }

    ol, ul {
		list-style: none;
	}

    a {
		text-decoration: none;
	}

    #root{
        width:100%;
        height: 100%;
    }

`
