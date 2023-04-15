export const loginStart = (userCredentials) => ({
  Type: "LOGIN_START",
});

export const loginSuccess = (user) => ({
  Type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = (error) => ({
  Type: "LOGIN_FAILURE",
  payload: error,
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const unFollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
