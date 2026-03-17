import { createContext } from "react";
import { createGroup } from "../services/group.services";
import toast from "react-hot-toast";

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const handleGroup = async (file, groupName, selectedMembers, handleClose) => {
    try {
      if (!groupName?.trim()) {
        toast.error("Group name is required");
        return;
      }

      if (selectedMembers.length < 2) {
        toast.error("Select at least two member");
        return;
      }
      const formData = new FormData();
      formData.append("name", groupName);
      formData.append("groupPhoto", file);
      formData.append("memberIds", JSON.stringify(selectedMembers));

      await createGroup(formData);
      toast.success("Group created successfully 🎉");
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Failed to create group ❌",
      );
    }
  };
  return (
    <GroupContext.Provider value={{ handleGroup }}>
      {children}
    </GroupContext.Provider>
  );
};
