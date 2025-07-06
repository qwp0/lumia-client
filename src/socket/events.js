import socket from "@/socket/socket";

export const joinRoom = (roomId, nickname) => {
  socket.emit("join_room", { roomId, nickname });
};

export const sendTextFeedback = ({ roomId, page, nickname, role, message }) => {
  socket.emit("text-feedback", {
    roomId,
    page,
    nickname,
    role,
    message,
  });
};
