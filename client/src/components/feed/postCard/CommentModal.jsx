import React from "react";
import { X } from 'lucide-react';
const CommentModal = ({ comments, onClose }) => {
  return (
     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-200 max-w-md max-h-[75vh] rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b border-gray-200 bg-liner-to-r from-slate-50 to-gray-50">
          <h2 className="text-xl font-bold text-gray-900">
            Comments
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({comments.length})
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
            aria-label="Close comments"
          >
            <X size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <p className="text-sm">No comments yet</p>
              <p className="text-xs mt-1">Be the first to comment!</p>
            </div>
          ) : (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="flex gap-3 group hover:bg-gray-50 p-3 rounded-lg transition-colors"
              >
                {/* Profile Image */}
                <img
                  src={
                    comment.user.profilePhoto ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.user.name)}&background=random`
                  }
                  alt={comment.user.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-2 ring-gray-100"
                />

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  {/* User Info */}
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-gray-900 truncate">
                      {comment.user.name}
                    </p>
                    {/* {comment.createdAt && (
                      <span className="text-xs text-gray-500 whitespace-nowrap">
                        {formatTime(comment.createdAt)}
                      </span>
                    )} */}
                  </div>

                  {/* Comment Bubble */}
                  <div className="bg-gray-100 px-4 py-2.5 rounded-2xl inline-block max-w-xs">
                    <p className="text-sm text-gray-800 wrap-break-word">
                      {comment.text}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
