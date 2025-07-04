import { useParams } from "react-router-dom";

import AudienceEnterModal from "@/components/modal/AudienceEnterModal";
import { joinRoom } from "@/socket/events";
import socket from "@/socket/socket";

const AudienceView = () => {
  const { roomId } = useParams();
  const handleJoin = (nickname) => {
    joinRoom(socket, roomId, nickname);
  };

  return (
    <AudienceEnterModal
      isOpen={true}
      onJoin={handleJoin}
    />
  );
};

export default AudienceView;
