import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncLoginUser } from '../states/authUser/action';
import useInput from '../hooks/useInput';
import InputForm from '../components/common/InputForm';
import Button from '../components/common/Button';

function LoginPage() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Dispatch thunk login dengan data dari form
    dispatch(asyncLoginUser({ email, password }));

    // Arahkan pengguna ke halaman utama setelah dispatch
    // API akan ditangani di background oleh Redux
    navigate('/');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login ke Akun Anda</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputForm
            id="email"
            label="Alamat Email"
            name="email"
            type="email"
            placeholder="johndoe@example.com"
            value={email}
            onChange={onEmailChange}
          />
          <InputForm
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={onPasswordChange}
          />
          <Button type="submit">
            Login
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Belum punya akun?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:underline">
            Register di sini
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;