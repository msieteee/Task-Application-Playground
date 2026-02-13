export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const alphanumericRegex = /^[a-zA-Z0-9]+$/;
export const alphaNumericSpaceRegex =
  /^[a-zA-Z0-9]([a-zA-Z0-9\s]*[a-zA-Z0-9])?$/;

export const nameValidation = (name: string) => {
  let message: string = "";

  if (name.trim().length === 0) {
    message = "Full Name cannot be blank.";
  } else if (name.trim().length < 3) {
    message = "Full Name must be at least 3 characters.";
  } else if (name.length > 30) {
    message = "Full Name cannot exceed 30 characters.";
  } else if (!alphaNumericSpaceRegex.test(name)) {
    message = "Full Name can only contain letters, numbers, and spaces.";
  }

  return message;
};

export const emailValidation = (email: string) => {
  let message: string = "";

  if (email.length === 0) {
    message = message || "Email address is required.";
  } else if (email.length > 50) {
    message = message || "Email address cannot exceed 50 characters.";
  } else if (!validateEmail(email)) {
    message = message || "Please enter a valid email address.";
  }

  return message;
};

export const usernameValidation = (username: string) => {
  let message: string = "";

  if (username.length === 0) {
    message = message || "Username cannot be blank.";
  } else if (username.length > 20) {
    message = message || "Username cannot exceed 20 characters.";
  } else if (!alphanumericRegex.test(username)) {
    message =
      message ||
      "Username can only contain letters and numbers (no special characters).";
  } else if (username.length < 3) {
    message = message || "Username must be at least 3 characters long.";
  }

  return message;
};

export const passwordValidation = (password: string) => {
  let message: string = "";

  if (password.length === 0) {
    message = message || "Password cannot be blank.";
  } else if (password.length > 20) {
    message = message || "Password cannot exceed 20 characters.";
  } else if (password.length < 6) {
    message = message || "Password must be at least 6 characters long.";
  }

  return message;
};
