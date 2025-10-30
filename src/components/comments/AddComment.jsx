import React, { useState } from 'react';
import Button from '../common/Button';
import PropTypes from 'prop-types';

function AddComment({ onAddComment }) {
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!content.trim()) return; // Jangan kirim komentar kosong
    onAddComment(content);
    setContent(''); // Kosongkan lagi textarea
  };

  return (
    <div className="mt-2">
      <h3 className="text-xl font-bold mb-3">Beri Komentar</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tulis komentarmu di sini..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
        <div className="mt-2">
          <Button type="submit">Kirim Komentar</Button>
        </div>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default AddComment;