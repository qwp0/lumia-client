import { useParams } from "react-router-dom";

const AudienceView = () => {
  const { roomId } = useParams();

  return <div>청중 방! Room ID: {roomId}</div>;
};

export default AudienceView;
