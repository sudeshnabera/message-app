import React from "react";

const FriendCard = ({ user, onClick, variant }) => {
  // return (
  //   <div
  //     onClick={onClick}
  //     className="bg-white border border-[#004953] rounded-xl p-[16px_0_16px_16px] hover:shadow-md hover:-translate-y-px transition-all duration-200"
  //   >
  //     <div className="flex gap-3 max-md:flex-col max-md:text-center">
  //       {/* Avatar */}
  //       <div className="relative shrink-0 max-md:mx-auto">
  //         <img
  //           src={user.profilePhoto}
  //           alt={user.name}
  //           className="w-12 h-12 rounded-full object-cover"
  //         />
  //       </div>

  //       {/* Details */}
  //       <div className="flex-1 min-w-0">
  //         <h3 className="text-[0.95rem] font-semibold text-slate-800 truncate mb-0.75">
  //           {user.name}
  //         </h3>

  //         <p className="text-[0.8rem] text-slate-500 truncate mb-0.75 max-md:whitespace-normal">
  //           {user.bio}
  //         </p>

  //         <p className="text-[0.8rem] text-slate-500 mb-4">{user.email}</p>

  //         {/* Buttons */}
  //         <div className="flex gap-2 flex-wrap max-md:flex-col">
  //           <button
  //             onClick={(e) => e.stopPropagation()}
  //             className="inline-flex items-center justify-center gap-1 px-3 py-1.5 text-[0.8rem] font-medium rounded-md bg-[#004953] text-white border border-[#004953] hover:opacity-90 transition"
  //           >
  //             <svg
  //               width="14"
  //               height="14"
  //               viewBox="0 0 24 24"
  //               fill="none"
  //               stroke="currentColor"
  //               strokeWidth="2"
  //             >
  //               <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
  //               <circle cx="8.5" cy="7" r="4"></circle>
  //               <line x1="20" y1="8" x2="20" y2="14"></line>
  //               <line x1="23" y1="11" x2="17" y2="11"></line>
  //             </svg>
  //             Add Friend
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  
  return (
    <div onClick={onClick} className="bg-white border border-[#004953]/30 rounded-xl p-4 hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start text-center sm:text-left">
        <img
          src={user.profilePhoto}
          alt={user.name}
          className="w-14 h-14 rounded-full object-cover"
        />

        <div className="flex-1 w-full">
          <h3 className="text-sm font-semibold text-slate-800">{user.name}</h3>

          <p className="text-xs text-slate-500">{user.bio}</p>
          <p className="text-[0.8rem] text-slate-500 mb-4">{user.email}</p>

          <div className="mt-3 flex gap-2 flex-wrap justify-center sm:justify-start">
            {/* 🔥 Suggested Friend */}
            {variant === "suggestion" && (
              <button className="px-3 py-1 text-xs rounded bg-[#004953] text-white">
                Add Friend
              </button>
            )}

            {/* 🔥 Friend Request */}
            {variant === "request" && (
              <>
                <button className="px-3 py-1 text-xs rounded bg-[#004953] text-white">
                  Accept
                </button>

                <button className="px-3 py-1 text-xs rounded bg-white border border-[#004953] text-[#004953]">
                  Reject
                </button>
              </>
            )}

            {/* 🔥 Existing Friend */}
            {variant === "friend" && (
              <>
                <button className="px-3 py-1 text-xs rounded bg-[#004953] text-white">
                  Message
                </button>

                <button className="px-3 py-1 text-xs rounded bg-gray-200 text-gray-700">
                  Unfriend
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
