import React, { useContext } from "react";
import CreatePost from "../../components/feed/CreatePost";
import PostCard from "../../components/feed/postCard/PostCard.jsx";
import { PostContext } from "../../context/PostContext";
const FeedPage = () => {
  
  const { post } = useContext(PostContext);

  return (
    <div className="flex justify-center gap-8 px-6 py-6">
      {/* ================= FEED COLUMN ================= */}
      <div className="w-full max-w-2xl space-y-6">
        {/* ---------- Create Post ---------- */}
        <CreatePost />

        {/* ---------- Post Card ---------- */}
        {post.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>

      {/* ================= RIGHT SIDEBAR ================= */}
      <div className="w-75 hidden xl:block">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sticky top-6">
          <h3 className="font-semibold text-gray-800 mb-5">
            Suggestions for you
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/111"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-sm font-medium">Sarah Smith</span>
              </div>

              <button className="text-sm text-[#004953] font-semibold hover:underline">
                Follow
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/112"
                  className="w-10 h-10 rounded-full"
                />
                <span className="text-sm font-medium">Alex Johnson</span>
              </div>

              <button className="text-sm text-[#004953] font-semibold hover:underline">
                Follow
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
