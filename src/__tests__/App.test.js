import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/vue';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';
import App from '../App.vue';
import { router } from '../router';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// const mockPush = jest.fn();

// jest.mock('vue-router', () => ({
//   userRouter: () => ({
//     push: (...args) => mockPush(...args),
//   }),
// }));

function setup(cb) {
  return {
    user: userEvent.setup(),
    ...render(
      App,
      {
        global: {
          plugins: [createTestingPinia(), router],
        },
      },
      cb
    ),
  };
}

describe('用户名', () => {
  it('用户名组件应当存在于页面中', () => {
    setup();

    expect(screen.getByLabelText('用户名')).toBeInTheDocument();
  });

  it('如果没输入用户名,失焦时会提示请输入用户名', async () => {
    const { user } = setup();

    await user.click(screen.getByLabelText('用户名'));
    await user.click(screen.getByText('密码'));

    expect(await screen.findByText('请输入用户名')).toBeInTheDocument();
  });

  it('如果输入的用户名不是手机号,则会提示错误,重新输入则会清空错误信息', async () => {
    const { user } = setup();

    await user.click(screen.getByLabelText('用户名'));
    await user.keyboard('abcdefg');
    await user.click(screen.getByText('密码'));

    expect(await screen.findByText('用户名必须是手机号')).toBeInTheDocument();

    await user.clear(screen.getByLabelText('用户名'));
    await waitForElementToBeRemoved(() =>
      screen.queryByText('用户名必须是手机号')
    );
  });
});

describe('密码', () => {
  it('密码组件应当存在于页面中', () => {
    setup();

    expect(screen.getByLabelText('密码')).toBeInTheDocument();
  });

  it('如果没输入密码,失焦时会提示请输入密码', async () => {
    const { user } = setup();

    await user.click(screen.getByLabelText('密码'));
    await user.click(screen.getByText('用户名'));

    expect(await screen.findByText('请输入密码')).toBeInTheDocument();
  });

  it('如果输入的密码错误,则会提示错误,重新输入则会清空错误信息', async () => {
    const { user } = setup();

    await user.click(screen.getByLabelText('密码'));
    await user.keyboard('abcde');
    await user.click(screen.getByText('确 定'));

    expect(
      await screen.findByText('密码必须是6到16位字符')
    ).toBeInTheDocument();

    await user.click(screen.getByLabelText('密码'));
    await user.keyboard('abcde');

    await waitForElementToBeRemoved(() =>
      screen.queryByText('密码必须是6到16位字符')
    );
  });
});

describe.only('记住密码', () => {
  it('不勾选时,点确定不会保存密码', async () => {
    const { user } = setup();

    await user.type(screen.getByLabelText('用户名'), '13883198386');
    await user.type(screen.getByLabelText('密码'), '123456');
    await user.click(screen.getByText('确 定'));

    expect(localStorage.getItem('name')).toBeNull();
    expect(localStorage.getItem('password')).toBeNull();
  });

  it('勾选时,点确定会保存密码', async () => {
    const { user } = setup();

    await user.type(screen.getByLabelText('用户名'), '13883198386');
    await user.type(screen.getByLabelText('密码'), '123456');
    await user.click(screen.getByLabelText('记住密码'));
    await user.click(screen.getByText('确 定'));

    expect(localStorage.getItem('name')).toBe('13883198386');
    expect(localStorage.getItem('password')).toBe('123456');
  });

  it.only('加载页面时如果有保存用户名和密码,则跳转到个人中心页面', async () => {
    localStorage.setItem('name', '13883198386');
    localStorage.setItem('password', '123456');

    setup();
    expect(
      await screen.findByText('Installed CLI Plugins')
    ).toBeInTheDocument();
  });
});
