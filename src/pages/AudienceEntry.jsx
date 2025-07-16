import { useNavigate, useParams } from "react-router-dom";

import AudienceEnterModal from "@/components/modal/AudienceEnterModal";

const AudienceEntry = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const handleSubmit = (nickname) => {
    navigate(`/audience/${roomId}`, { state: { nickname } });
  };

  return (
    <AudienceEnterModal
      isOpen={true}
      onJoin={handleSubmit}
    />
  );
};

export default AudienceEntry;
