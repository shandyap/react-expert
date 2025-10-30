import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import useInput from '../hooks/useInput';
import InputForm from '../components/common/InputForm';
import Button from '../components/common/Button';

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(asyncRegisterUser({ name, email, password }));

    // Arahkan ke halaman login setelah register
    // Alert "registrasi berhasil" akan muncul dari thunk
    navigate('/login');
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Buat Akun Threads App</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputForm
            id="name"
            label="Nama Lengkap"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={onNameChange}
          />
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
            Register
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Login di sini
          </Link>
        </p>
      </div>
    </section>
  );
}

export default RegisterPage;