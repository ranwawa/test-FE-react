import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form } from 'antd';
import Mobile from '../Mobile';

Object.defineProperty(window, 'matchMedia', {
  value: () => ({
    addListener: () => {},
    removeListener: () => {},
  }),
});

describe('手机号输入框相关测试', () => {
  test('组件渲染成功后,界面上要显示用户名及请输入手机号码', () => {
    render(
      <Form>
        <Mobile></Mobile>
      </Form>
    );

    expect(screen.getByText('用户名')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('请输入手机号')).toBeInTheDocument();
  });
});

describe('用户操作相关测试', () => {
  test('输入错误的手机号码,界面上要显示手机号码格式有误', () => {
    render(
      <Form>
        <Mobile></Mobile>
      </Form>
    );

    const input = screen.getByPlaceholderText('请输入手机号');
    fireEvent.change(input, { target: { value: '133' } });
    fireEvent.blur(input);

    expect(screen.getByText('手机号码格式有误')).toBeInTheDocument();
  });

  test('手机号码输错后,再重新输入手机号码,要清空错误信息', async () => {
    render(
      <Form>
        <Mobile></Mobile>
      </Form>
    );

    const input = screen.getByPlaceholderText('请输入手机号');
    fireEvent.change(input, { target: { value: '133' } });
    fireEvent.blur(input);

    expect(screen.getByText('手机号码格式有误')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: '' } });
    await waitFor(() => {
      expect(screen.queryByText('手机号码格式有误')).not.toBeInTheDocument();
    });
  });
});
