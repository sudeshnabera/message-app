import React, { useState } from "react";
import PostHeader from "./PostHeader.jsx";
import PostContent from "./PostContent.jsx";
import PostAction from "./PostAction.jsx";
import CommentInput from "./CommentInput.jsx";

const PostCard = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  const isShared = !!post.sharedPost;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      {/* <PostHeader user={post.user} createdAt={post.createdAt} /> */}

      {/* Content */}
      {/* <PostContent caption={post.caption} images={post.image} /> */}

      {/* Actions */}
      {/* <PostAction post={post} comments={comments} />

      <CommentInput
        user={post.user}
        postId={post._id}
        setComments={setComments}
      /> */}

      {/* 🔹 Header (Always show sharing user) */}
      <PostHeader user={post.user} createdAt={post.createdAt} />

      {/* 🔹 Caption of share (if exists) */}
      {post.caption && isShared && (
        <div className="px-5 py-3 text-sm text-gray-800">{post.caption}</div>
      )}

      {/* 🔥 If Shared Post Exists */}
      {isShared ? (
        <div className="mx-5 mb-4 border border-gray-200 rounded-xl p-4 bg-gray-50">
          {/* Original Post Header */}
          <PostHeader
            user={post.sharedPost.user}
            createdAt={post.sharedPost.createdAt}
          />

          {/* Original Post Content */}
          <PostContent
            caption={post.sharedPost.caption}
            images={post.sharedPost.image}
          />
        </div>
      ) : (
        /* Normal Post Content */
        <PostContent caption={post.caption} images={post.image} />
      )}

      {/* 🔹 Actions */}
      <PostAction post={post} comments={comments} />

      <CommentInput
        user={post.user}
        postId={post._id}
        setComments={setComments}
      />
    </div>
  );
};

export default PostCard;
