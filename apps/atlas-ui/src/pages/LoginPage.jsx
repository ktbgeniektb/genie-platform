// src/pages/LoginPage.jsx
import { useState } from 'react';
import { login, getUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      const user = await getUser();
      console.log('ログイン成功！ユーザー情報:', user.data);
      navigate('/gs/genie-platform/apps/atlas-ui');
    } catch (err) {
      console.error('ログイン失敗:', err.response?.data || err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginPage;
