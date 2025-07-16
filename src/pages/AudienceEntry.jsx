import { useNavigate, useParams } from "react-router-dom";

import AudienceEnterModal from "@/components/modal/AudienceEnterModal";
import { useCheckRoomValid } from "@/hooks/useCheckRoomValid";

const AudienceEntry = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (nickname) => {
    navigate(`/audience/${roomId}`, { state: { nickname } });
  };

  const isValidRoom = useCheckRoomValid(roomId);

  if (isValidRoom === null) return null;

  return (
    <AudienceEnterModal
      isOpen={true}
      onJoin={handleSubmit}
    />
  );
};

export default AudienceEntry;
