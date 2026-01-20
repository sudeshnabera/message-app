import jwt from "jsonwebtoken";
import "dotenv/config";
/**
 * Generate access token
 * @param details
 */
export const generateTokens = async (userId) => {
  const accessToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  
  return accessToken;
};
