import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HiPlusCircle } from 'react-icons/hi';
import ThreadItem from '../components/threads/ThreadItem';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';

function HomePage() {
  // Ambil state threads dan users dari Redux
  const {
    threads = [],
    users = [],
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  // Ambil data saat komponen pertama kali dimuat
  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  // Gabungkan data threads dan users
  // Cari 'owner' dari setiap thread di dalam state 'users'
  const threadList = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId),
  }));

  // Dapatkan semua kategori unik dari data threads
  const categories = [...new Set(threads.map((thread) => thread.category))];

  return (
    <div className="container mx-auto max-w-4xl p-4 mt-5">
      {/* Bagian Header dengan Tombol Aksi */}
      <header className="flex justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-3xl font-bold text-gray-800">Diskusi Tersedia</h1>
        <Link
          to="/threads/new"
          className="flex items-center gap-2 bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
        >
          <HiPlusCircle className="text-xl" />
          <span>Buat Diskusi</span>
        </Link>
      </header>

      {/* Bagian Filter Kategori */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 text-gray-700">Filter Kategori</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button key={category} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors">
              #{category}
            </button>
          ))}
        </div>
      </div>

      {/* Tampilkan threadList yang sudah digabung */}
      <div className="thread-list space-y-5">
        {threadList.map((thread) => (
          <ThreadItem key={thread.id} {...thread} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;