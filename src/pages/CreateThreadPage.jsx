import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import useInput from '../hooks/useInput';
import InputForm from '../components/common/InputForm';
import Button from '../components/common/Button';

function CreateThreadPage() {
  // Siapkan state untuk form
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Langkah Perlindungan Halaman ---
  // Cek apakah pengguna sudah login
  useEffect(() => {
    if (authUser === null) {
      alert('Anda harus login untuk membuat thread!');
      navigate('/login');
    }
  }, [authUser, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Kirim data ke Redux
    dispatch(asyncAddThread({ title, body, category }));

    // Kembalikan ke halaman utama
    navigate('/');
  };

  return (
    <section className="container mx-auto max-w-2xl p-4 mt-5">
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center">Buat Diskusi Baru</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputForm
            id="title"
            label="Judul"
            name="title"
            placeholder="Apa yang ingin Anda tanyakan?"
            value={title}
            onChange={onTitleChange}
          />
          <InputForm
            id="category"
            label="Kategori"
            name="category"
            placeholder="Contoh: react, redux, perkenalan"
            value={category}
            onChange={onCategoryChange}
          />
          <div>
            <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">
              Isi Thread
            </label>
            <textarea
              id="body"
              value={body}
              onChange={onBodyChange}
              placeholder="Tuliskan isi pikiranmu secara detail..."
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="10"
            />
          </div>
          <Button type="submit">
            Buat Thread
          </Button>
        </form>
      </div>
    </section>
  );
}

export default CreateThreadPage;