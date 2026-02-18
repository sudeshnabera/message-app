import React from "react";

const FeedPage = () => {
  return (
    <div className="flex justify-center gap-8 px-6 py-6">
      {/* ================= FEED COLUMN ================= */}
      <div className="w-full max-w-2xl space-y-6">
        {/* ---------- Create Post ---------- */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="https://i.pravatar.cc/100"
              alt="User"
              className="w-11 h-11 rounded-full"
            />
            <input
              type="text"
              placeholder="What's on your mind, Sudeshna?"
              className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#004953]/20"
            />
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <button className="text-sm text-gray-600 hover:text-[#004953]">
              📷 Photo
            </button>

            <button className="bg-[#004953] text-white px-5 py-2 rounded-lg text-sm hover:opacity-90 transition">
              Post
            </button>
          </div>
        </div>

        {/* ---------- Post Card ---------- */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/101"
                alt="User"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-semibold text-gray-800">John Doe</div>
                <div className="text-xs text-gray-500">2 hours ago</div>
              </div>
            </div>

            <button className="w-8 h-8 rounded-full hover:bg-gray-100">
              ⋮
            </button>
          </div>

          {/* Content */}
          <div className="px-5 pb-4">
            <p className="text-sm text-gray-700 mb-4">
              This is a beautiful day 🌤️ #nature #life
            </p>

            <img
              src="https://picsum.photos/600/350"
              alt="Post"
              className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-around border-t text-sm py-3">
            <button className="flex items-center gap-2 hover:text-red-500">
              ♡ <span>12</span>
            </button>

            <button className="flex items-center gap-2 hover:text-blue-500">
              💬 <span>5</span>
            </button>

            <button className="flex items-center gap-2 hover:text-green-500">
              ↗ Share
            </button>
          </div>
        </div>
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
