import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import '@testing-library/jest-dom';
import App from '../App'

Object.defineProperty(window, 'matchMedia', {
	value: () => ({
		addListener: () => { },
		removeListener: () => { },
	}),
});

const mockGetItem = jest.fn()
const mockSetItem = jest.fn()
Object.defineProperty(window, 'localStorage', {
	value: {
		getItem: () => mockGetItem(),
		setItem: (...params) => mockSetItem(...params),
	},
});

describe('自动登录相关测试', () => {
	test('如果storage中没有token,则停留在登录页面', () => {
		mockGetItem.mockReturnValueOnce(undefined)
		render(<MemoryRouter initialEntries={['/login']}>
			<App />
		</MemoryRouter>)

		expect(screen.getByText(/忘记密码/)).toBeInTheDocument();
	});

	test('点击登录按钮,要把token缓存到storage中,然后跳转个人中心页面', () => {
		mockGetItem.mockReturnValueOnce(undefined)
		render(<MemoryRouter initialEntries={['/login']}>
			<App />
		</MemoryRouter>)

		expect(screen.getByRole('button')).toHaveAttribute('disabled')

		fireEvent.input(screen.getByPlaceholderText('请输入手机号'), { target: { value: '13883198388' } })
		fireEvent.change(screen.getByPlaceholderText('请输入手机号'))
		expect(screen.getByRole('button')).not.toHaveAttribute('disabled')

		fireEvent.click(screen.getByRole('button'))
		expect(mockSetItem).toHaveBeenCalledWith('token', '13883198388');
		expect(screen.getByText('个人中心页面')).toBeInTheDocument();
	});

	test('如果storage中有token,则直接跳转个人中心页面', () => {
		mockGetItem.mockReturnValueOnce('13883198388')
		render(<MemoryRouter initialEntries={['/login']}>
			<App />
		</MemoryRouter>)

		expect(screen.getByText('个人中心页面')).toBeInTheDocument();
	});
});