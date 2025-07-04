export const joinRoom = (socket, roomId, nickname) => {
  socket.emit("join_room", { roomId, nickname });
};
