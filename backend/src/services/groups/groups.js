import { StatusError } from "../../config/statusError.js";
import { Group } from "../../models/index.js";

export const createGroup = async (group) => {
  const newGroup = await Group.create(group);
  return newGroup;
};
