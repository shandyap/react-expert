import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineChatAlt } from 'react-icons/hi';
import { formatDistance } from 'date-fns';
import PropTypes from 'prop-types';

function ThreadItem({ id, title, body, category, createdAt, owner, totalComments }) {
  // Fungsi untuk memotong teks
  const truncateText = (text, length) => {
    // Menghapus tag HTML dari body untuk preview
    const strippedText = text.replace(/<[^>]*>?/gm, ' ');
    return strippedText.length > length ? `${strippedText.substring(0, length)  }...` : strippedText;
  };

  // Map untuk memberikan warna berbeda pada setiap kategori
  const categoryColorMap = {
    react: 'bg-blue-100 text-blue-800',
    redux: 'bg-purple-100 text-purple-800',
    perkenalan: 'bg-green-100 text-green-800',
    discussion: 'bg-yellow-100 text-yellow-800',
    default: 'bg-gray-100 text-gray-800',
  };

  const categoryColor = categoryColorMap[category] || categoryColorMap.default;

  return (
    // Efek hover: shadow lebih besar dan kartu sedikit terangkat
    <div className="bg-white rounded-lg shadow border border-gray-200 p-5 transition-all duration-200 hover:shadow-xl hover:-translate-y-1">
      <header className="mb-3">
        <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${categoryColor}`}>
          #{category}
        </span>

        {/* Kriteria: Judul dari thread */}
        <Link to={`/threads/${id}`}>
          <h2 className="text-2xl font-bold text-gray-900 hover:text-blue-700 transition-colors">
            {title}
          </h2>
        </Link>
      </header>

      {/* Kriteria: Potongan dari body thread (opsional) */}
      <div
        className="text-gray-600 line-clamp-3"
      >
        {truncateText(body, 200)}
      </div>

      <footer className="flex items-center justify-between mt-4 pt-4 border-t text-gray-500 text-sm">
        {/* Kriteria: Jumlah komentar */}
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-1">
            <HiOutlineChatAlt className="text-lg" />
            <span>{totalComments}</span>
          </div>
        </div>

        {/* Kriteria: Informasi pembuat thread & Waktu pembuatan */}
        <div className="flex items-center">
          {/* Kriteria: Avatar */}
          <img src={owner.avatar} alt={owner.name} className="w-6 h-6 rounded-full mr-2" />
          {/* Kriteria: Nama */}
          <span>{owner.name}</span>
          <span className="mx-2 text-gray-300">•</span>
          {/* Kriteria: Waktu pembuatan thread */}
          <span>{formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}</span>
        </div>
      </footer>
    </div>
  );
}

// Menambahkan PropTypes untuk validasi
ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ThreadItem;