import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import * as Router from 'react-router-dom';
import App from '../App'
import { Login } from '../Login'
import { TokenContext } from '../context/Token';

const mockTrack = jest.fn()
jest.mock('sa-sdk-javascript', () => ({
	track: (...params) => mockTrack(...params)
}))

Object.defineProperty(window, 'matchMedia', {
	value: () => ({
		addListener: () => { },
		removeListener: () => { },
	}),
});


describe('忘记密码相关测试', () => {
	test('点击忘记密码,要上报forgot神策事件', () => {
		render(<MemoryRouter initialEntries={['/login']}>
			<App />
		</MemoryRouter>)

		fireEvent.click(screen.getByText('忘记密码?'))

		expect(mockTrack).toBeCalledTimes(1)
		expect(mockTrack).toHaveBeenCalledWith('forgot');
	});

	test('点击忘记密码,要跳转到忘记密码页面', () => {
		render(<MemoryRouter initialEntries={['/login']}>
			<App />
		</MemoryRouter>)

		fireEvent.click(screen.getByText('忘记密码?'))

		expect(screen.getByText('忘记密码页面')).toBeInTheDocument()
	});
});

