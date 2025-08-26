import { useNavigate, useParams } from "react-router-dom";

import AudienceEnterModal from "@/components/modal/AudienceEnterModal";
import { useCheckRoomValid } from "@/hooks/useCheckRoomValid";

const AudienceEntry = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = (nickname: string) => {
    navigate(`/audience/${roomId}`, { state: { nickname } });
  };

  if (!roomId) return null;
  useCheckRoomValid(roomId);

  return (
    <AudienceEnterModal
      isOpen={true}
      onJoin={handleSubmit}
    />
  );
};

export default AudienceEntry;
