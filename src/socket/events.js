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

export const sendCursorPosition = ({ roomId, page, x, y, nickname }) => {
  socket.emit("cursor-move", { roomId, page, x, y, nickname });
};

export const sendSlideChange = ({ roomId, page }) => {
  socket.emit("slide-change", { roomId, page });
};

export const getCurrentPage = ({ roomId }) => {
  socket.emit("current-page", roomId);
};

export const sendDrawData = ({ roomId, page, drawings }) => {
  socket.emit("draw-data", { roomId, page, drawings });
};

export const sendPresentationEnd = ({ roomId }) => {
  socket.emit("presentation-end", { roomId });
};
