import React from 'react';
import { HiOutlineThumbUp, HiThumbUp, HiOutlineThumbDown, HiThumbDown } from 'react-icons/hi';
import PropTypes from 'prop-types';

function CommentItem({
  id, content, owner, createdAt,
  upVotesBy, downVotesBy, authUser, onVoteComment,
}) {
  // Cek apakah user yang login sudah vote
  const hasVotedUp = authUser ? upVotesBy.includes(authUser.id) : false;
  const hasVotedDown = authUser ? downVotesBy.includes(authUser.id) : false;

  // Handler untuk tombol vote
  const handleVoteUp = (e) => {
    e.stopPropagation();
    onVoteComment(id, hasVotedUp ? 0 : 1); // 0 = netral, 1 = up
  };

  const handleVoteDown = (e) => {
    e.stopPropagation();
    onVoteComment(id, hasVotedDown ? 0 : -1); // 0 = netral, -1 = down
  };

  return (
    <div className="p-4 border-t border-gray-200 first:border-t-0">
      <header className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <img src={owner.avatar} alt={owner.name} className="w-8 h-8 rounded-full mr-3" />
          <p className="font-bold text-gray-800">{owner.name}</p>
        </div>
        <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</p>
      </header>

      <div
        className="text-gray-700 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* --- TOMBOL VOTE UNTUK KOMENTAR --- */}
      <footer className="flex items-center space-x-4 mt-3 text-gray-500">
        <button onClick={handleVoteUp} className="flex items-center space-x-1 hover:text-green-500">
          {hasVotedUp ? <HiThumbUp className="text-green-500" /> : <HiOutlineThumbUp />}
          <span>{upVotesBy.length}</span>
        </button>
        <button onClick={handleVoteDown} className="flex items-center space-x-1 hover:text-red-500">
          {hasVotedDown ? <HiThumbDown className="text-red-500" /> : <HiOutlineThumbDown />}
          <span>{downVotesBy.length}</span>
        </button>
      </footer>
      {/* --------------------------------- */}
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onVoteComment: PropTypes.func.isRequired,
};

export default CommentItem;