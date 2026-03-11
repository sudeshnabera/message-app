import { createContext, useState } from "react";
import {
  acceptFriendRequest,
  createFriendRequest,
  getAllFriends,
  getFriendRequest,
  getFriendSuggestion,
  rejectFriendRequest,
  unFriend,
} from "../services/friends.services";

export const FriendContext = createContext();

export const FriendProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const fetchFriends = async () => {
    const res = await getAllFriends();
    setFriends(res.data.friendList);
  };
  const handleUnfriend = async (senderId, receiverId) => {
    const response = await unFriend(senderId, receiverId);
  };

  const fetchSuggestions = async () => {
    const response = await getFriendSuggestion();
    setSuggestions(response.data.users);
  };

  const sendFriendRequest = async (receiverId) => {
    await createFriendRequest(receiverId);
  };

  const fetchFriendRequest = async () => {
    const res = await getFriendRequest();
    setRequests(res.data.requests);
  };

  const handleAcceptRequest = async (requestId) => {
    await acceptFriendRequest(requestId);
  };

  const handleRejectRequest = async (requestId) => {
    await rejectFriendRequest(requestId)
  };
  return (
    <FriendContext.Provider
      value={{
        friends,
        requests,
        suggestions,
        fetchFriends,
        handleUnfriend,
        fetchSuggestions,
        sendFriendRequest,
        fetchFriendRequest,
        handleAcceptRequest,
        handleRejectRequest
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};
