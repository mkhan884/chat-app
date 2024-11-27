const { Server } = require("socket.io");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // Handle room joining
    socket.on("join room", (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
      socket.emit("notification", `You joined room: ${room}`);
    });

    // Handle chat messages
    socket.on("chat message", ({ room, text }) => {
      if (room) {
        console.log(`Message to room ${room}: ${text}`);
        io.to(room).emit("chat message", { text });
      } else {
        socket.emit("notification", "You must join a room first.");
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};
