import React, { useState } from 'react'
import { useEffect } from 'react'

export const TokenContext = React.createContext('')

export const Token = ({ children }) => {
	const [ token, setToken ] = useState('')

	const storageToken = (mobile) => {
		localStorage.setItem('token', mobile)
		setToken(mobile)
	}

	useEffect(() => {
		setToken(localStorage.getItem('token') || '')
	}, [setToken])

	return <TokenContext.Provider value={{ token, storageToken }}>
		{children}
	</TokenContext.Provider>
}