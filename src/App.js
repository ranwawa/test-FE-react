import { Routes, Route } from 'react-router-dom';
import { Token } from './context/Token';
import { Login } from './Login';

export const App = () => {
	return (
		<Token>
			<Routes>
				<Route path='/profile' element="个人中心页面" />
				<Route path='/login' element={<Login />} />
				<Route path='/forgot' element="忘记密码页面" />
			</Routes>
		</Token>)
}

export default App