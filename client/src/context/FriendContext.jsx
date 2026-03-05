import { createContext, useState } from "react";
import {
  acceptFriendRequest,
  createFriendRequest,
  getAllFriends,
  getFriendRequest,
  getFriendSuggestion,
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
  const handelUnfriend = async (senderId, receiverId) => {
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
    const res = await getFriendRequest()
    setRequests(res.data.requests.senderId)
  };

  const handleAcceptRequest = async (receiverId) => {
    await acceptFriendRequest(receiverId);
  };
  return (
    <FriendContext.Provider
      value={{
        friends,
        requests,
        suggestions,
        fetchFriends,
        handelUnfriend,
        fetchSuggestions,
        sendFriendRequest,
        fetchFriendRequest,
        handleAcceptRequest,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};
