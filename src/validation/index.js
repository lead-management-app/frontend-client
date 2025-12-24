import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
});

export const loginScheme = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password must be alphanumeric (letters & numbers only)"
    ),
});

export const resetScheme = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password must be alphanumeric (letters & numbers only)"
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password must be alphanumeric (letters & numbers only)"
    ),
});

export const setpasswordScheme = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password must be alphanumeric (letters & numbers only)"
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Password must be alphanumeric (letters & numbers only)"
    ),
});

export const forgotpasswordScheme = yup.object().shape({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email"),
});
