import React from 'react';
import { HiOutlineThumbUp, HiThumbUp, HiOutlineThumbDown, HiThumbDown } from 'react-icons/hi';
import PropTypes from 'prop-types';

function ThreadDetail({
  title, body, owner, createdAt, category,
  upVotesBy, downVotesBy, authUser, onVoteThread,
}) {
  // Cek apakah user yang login sudah vote
  const hasVotedUp = authUser ? upVotesBy.includes(authUser.id) : false;
  const hasVotedDown = authUser ? downVotesBy.includes(authUser.id) : false;

  // Handler untuk tombol vote
  // 0 = netral, 1 = upvote, -1 = downvote
  const handleVoteUp = () => onVoteThread(hasVotedUp ? 0 : 1);
  const handleVoteDown = () => onVoteThread(hasVotedDown ? 0 : -1);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <header className="mb-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #{category}
        </span>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{title}</h1>
      </header>

      <div
        className="prose max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: body }}
      />

      {/* --- TOMBOL VOTE UNTUK THREAD --- */}
      <div className="flex items-center space-x-4 mt-4 pt-4 border-t text-gray-600">
        <button onClick={handleVoteUp} className="flex items-center space-x-1 hover:text-green-500">
          {hasVotedUp ? <HiThumbUp className="text-green-500" /> : <HiOutlineThumbUp />}
          <span>{upVotesBy.length} Suka</span>
        </button>
        <button onClick={handleVoteDown} className="flex items-center space-x-1 hover:text-red-500">
          {hasVotedDown ? <HiThumbDown className="text-red-500" /> : <HiOutlineThumbDown />}
          <span>{downVotesBy.length} Tidak Suka</span>
        </button>
      </div>
      {/* ------------------------------- */}

      <footer className="mt-6 pt-4 border-t flex items-center">
        <img src={owner.avatar} alt={owner.name} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold text-gray-800">{owner.name}</p>
          <p className="text-sm text-gray-500">
            Dibuat pada {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </footer>
    </div>
  );
}

ThreadDetail.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onVoteThread: PropTypes.func.isRequired,
};

export default ThreadDetail;