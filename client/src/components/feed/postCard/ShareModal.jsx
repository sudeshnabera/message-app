import React, { useState } from "react";
import { sharePost } from "../../../services/post.services";

  const ShareModal = ({ post, onClose }) => {
    const [caption, setCaption] = useState("");

    const handleShare = async () => {
      try {
        await sharePost({ postId: post._id, caption: caption });
        onClose();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      {/* Modal Box */}
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-5 relative animate-scaleIn">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-400 pb-3 mb-4">
          <h2 className="text-lg font-semibold">Share Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Caption Input */}
        <textarea
          placeholder="Write something..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#004953] resize-none mb-4"
          rows="3"
        />

        {/* Original Post Preview */}
        <div className="border border-gray-300 rounded-xl p-4 bg-gray-50 mb-4">
          <div className="font-semibold text-sm mb-1">{post.user?.name}</div>

          {post.caption && (
            <p className="text-sm text-gray-700 mb-2">{post.caption}</p>
          )}

          {post.image?.length > 0 && (
            <img
              src={post.image[0]}
              alt="preview"
              className="rounded-lg w-full object-cover max-h-60"
            />
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#004953] text-sm hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-2 rounded-xl bg-[#004953] text-white text-sm hover:bg-[#004953] transition"
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
