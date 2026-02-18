import React, { useState } from "react";
import FriendCard from "../../components/friends/FriendCard.jsx";
import UserProfileModal from "../../components/friends/UserProfileModal.jsx";

const FriendRequests = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const users = [
    {
      _id: "1",
      name: "Sarah Johnson",
      bio: "Frontend Developer | Vue & React",
      email: "sarah@example.com",
      profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      _id: "2",
      name: "John Smith",
      bio: "Full Stack Developer",
      email: "john@example.com",
      profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  return (
    <div className="p-6 h-screen w-full bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#004953]">Friend Request</h1>
      </div>

      {/* Search */}
      <div className="max-w-100 mx-auto mb-8">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>

          <input
            type="text"
            placeholder="Search by name or username..."
            className="w-full pl-10 pr-3 py-1.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition"
          />
        </div>
      </div>

      {/* User Grid */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {users.map((user) => (
          <FriendCard
            key={user._id}
            user={user}
            onClick={() => setSelectedUser(user)}
            variant="request"
          />
        ))}
      </div>
      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          variant="request"
        />
      )}
    </div>
  );
};

export default FriendRequests;
