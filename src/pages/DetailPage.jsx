import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  clearThreadDetailActionCreator,
  asyncAddComment,
  asyncToggleVoteThreadDetail,
  asyncToggleVoteComment,
} from '../states/threadDetail/action';

import ThreadDetail from '../components/threads/ThreadDetail';
import CommentItem from '../components/comments/CommentItem';
import AddComment from '../components/comments/AddComment';

function DetailPage() {
  const { threadId } = useParams(); // Ambil ID dari URL
  const dispatch = useDispatch();

  // Ambil state yang relevan dari Redux
  const {
    threadDetail = null,
    authUser = null,
  } = useSelector((states) => states);

  // Efek untuk mengambil data saat komponen dimuat (atau threadId berubah)
  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(threadId));

    // Fungsi cleanup: dijalankan saat komponen ditutup
    return () => {
      dispatch(clearThreadDetailActionCreator());
    };
  }, [threadId, dispatch]);

  // Handler untuk menambah komentar
  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId, content }));
  };

  // Handler untuk vote thread
  const onVoteThread = (voteType) => {
    if (!authUser) return alert('Anda harus login untuk voting!');
    dispatch(asyncToggleVoteThreadDetail(voteType));
  };

  // Handler untuk vote komentar
  const onVoteComment = (commentId, voteType) => {
    if (!authUser) return alert('Anda harus login untuk voting!');
    dispatch(asyncToggleVoteComment(commentId, voteType));
  };

  // Tampilkan loading (atau null) jika data belum siap
  if (!threadDetail) {
    return null; // Loading bar di App.jsx akan menangani visualnya
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 mt-5">
      <ThreadDetail
        {...threadDetail}
        authUser={authUser}
        onVoteThread={onVoteThread}
      />

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-4">Komentar ({threadDetail.comments.length})</h2>

        {/* Tampilkan form komentar HANYA jika sudah login */}
        {authUser ? (
          <AddComment onAddComment={onAddComment} />
        ) : (
          <p className="text-gray-600">
            Silakan <Link to="/login" className="text-blue-600 font-medium hover:underline">login</Link> untuk berkomentar.
          </p>
        )}

        <div className="comments-list mt-4 space-y-4">
          {threadDetail.comments.length > 0 ? (
            threadDetail.comments.map((comment) => (
              <CommentItem
                key={comment.id}
                {...comment}
                authUser={authUser}
                onVoteComment={onVoteComment}
              />
            ))
          ) : (
            <p className="text-gray-500">Belum ada komentar.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;