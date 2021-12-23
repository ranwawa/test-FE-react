import { Form, Input } from 'antd';
import { useState } from 'react';
import { isMobile } from '../utils';

const Mobile = ({ value, setValue }) => {
  const [err, setErr] = useState('');

  function handleInputChange(e) {
    setValue(e.target.value);
    setErr('');
  }

  function handleInputBlur() {
    if (value === '') {
      setErr('');
    } else if (!isMobile(value)) {
      setErr('手机号码格式有误');
    }
  }

  return (
    <Form.Item
      label='用户名'
      name='username'
      validateStatus={err ? 'error' : ''}
      help={err}
    >
      <Input
        placeholder='请输入手机号'
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
      />
    </Form.Item>
  );
};

export default Mobile;
