import socket from "@/socket/socket";
import type { ChatMessage } from "@/types/chat";
import type { Cursor } from "@/types/cursor";
import type { Path } from "@/types/drawing";

type TextFeedbackPayload = ChatMessage & { roomId: string };
type CursorPayload = Cursor & { roomId: string };

export const joinRoom = (roomId: string, nickname: string) => {
  socket.emit("join_room", { roomId, nickname });
};

export const sendTextFeedback = ({
  roomId,
  page,
  nickname,
  role,
  text,
}: TextFeedbackPayload) => {
  socket.emit("text-feedback", {
    roomId,
    page,
    nickname,
    role,
    text,
  });
};

export const sendCursorPosition = ({
  roomId,
  page,
  x,
  y,
  nickname,
}: CursorPayload) => {
  socket.emit("cursor-move", { roomId, page, x, y, nickname });
};

export const sendSlideChange = ({
  roomId,
  page,
}: {
  roomId: string;
  page: number;
}) => {
  socket.emit("slide-change", { roomId, page });
};

export const getCurrentPage = ({ roomId }: { roomId: string }) => {
  socket.emit("current-page", roomId);
};

export const sendDrawData = ({
  roomId,
  page,
  drawings,
}: {
  roomId: string;
  page: number;
  drawings: Path[];
}) => {
  socket.emit("draw-data", { roomId, page, drawings });
};

export const sendPresentationEnd = ({ roomId }: { roomId: string }) => {
  socket.emit("presentation-end", { roomId });
};
