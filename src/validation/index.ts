import * as yup from "yup";

export const registerSchema = yup
  .object({
    username: yup
      .string()
      .required("Username Is Required!")
      .min(6, "Username should be at least 5 characters!"),

    email: yup
      .string()
      .required("Email Is Required!")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address!"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password shoud be more than 6 characters!"),
  })
  .required();

export const loginSchema = yup
  .object({
    identifier: yup
      .string()
      .required("Email Is Required!")
      .matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, "Not a valid email address!"),

    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password shoud be more than 6 characters!"),
  })
  .required();
