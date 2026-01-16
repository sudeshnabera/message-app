import Joi from "joi";

/* =========================
   Register / Create User
========================= */
 const updateProfileValidation = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\s]+$/)
    .allow(null, "")
    .messages({
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name must not exceed 50 characters",
      "string.pattern.base": "Name can contain only letters and spaces",
    }),

  bio: Joi.string()
    .max(250)
    .allow(null, "")
    .messages({
      "string.max": "Bio must not exceed 250 characters",
    }),

  email: Joi.string()
    .email()
    .required()
    .lowercase()
    .messages({
      "string.email": "Please enter a valid email address",
      "any.required": "Email is required",
    }),

  phone: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .allow(null, "")
    .messages({
      "string.pattern.base": "Invalid phone number",
    }),

  dob: Joi.date()
    .max("now")
    .allow(null)
    .messages({
      "date.max": "Date of birth cannot be in the future",
    }),

  gender: Joi.string()
    .valid("male", "female", "other")
    .allow(null)
    .messages({
      "any.only": "Gender must be male, female, or other",
    }),

//   username: Joi.string()
//     .min(3)
//     .max(30)
//     .pattern(/^[a-zA-Z0-9_]+$/)
//     .required()
//     .messages({
//       "string.min": "Username must be at least 3 characters",
//       "string.max": "Username must not exceed 30 characters",
//       "string.pattern.base":
//         "Username can contain letters, numbers, and underscores only",
//     }),

  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "string.pattern.base":
        "Password must contain letters and numbers",
      "any.required": "Password is required",
    }),

  profilePhoto: Joi.string()
    .pattern(/\.(jpg|jpeg|png|webp)$/i)
    .allow(null, "")
    .messages({
      "string.pattern.base":
        "Profile photo must be an image (jpg, jpeg, png, webp)",
    }),
});

export default updateProfileValidation;