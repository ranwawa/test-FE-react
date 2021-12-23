import { useContext, useEffect, useState } from 'react';
import sensors from 'sa-sdk-javascript'
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from 'antd';
import Mobile from './components/Mobile';
import { TokenContext } from './context/Token';

export function Login() {
  const [mobile, setMobile] = useState('');
  const { token, storageToken } = useContext(TokenContext)
  const navigate = useNavigate()

  useEffect(() => {
    token && navigate('/profile')
  }, [token, navigate])

  return (
    <Form>
      <Mobile value={mobile} setValue={setMobile}/>
      <Link to="/forgot" onClick={() => sensors.track('forgot')}>忘记密码?</Link>
      <Button disabled={!mobile} onClick={() => storageToken(mobile)}>登录</Button>
    </Form>
  );
}
