const { Socket } = require("socket.io");

const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

// it checks that the userId of the client is already in the "users" array or not
// if it's not present then "push" the values
const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

// get user from the users[] here it contain a object {userId, socketId}
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  // when connect
  console.log("a user connected...");
  io.emit("welcome", "hello this is socket server!");
  //   take socket id from the client side
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // after it send the "users" array to client side for filtering the online friends
    io.emit("getUsers", users);
  });

  //   send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //   when disconnect
  //   after disconnet the user, the bellow task will remove the user from the users[]
  socket.on("disconnect", () => {
    console.log("User disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
