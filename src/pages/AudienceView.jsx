import AudienceEnterModal from "@/components/modal/AudienceEnterModal";

const AudienceView = () => {
  return (
    <AudienceEnterModal
      isOpen={true}
      onConfirm={(name) => console.log(name)}
    />
  );
};

export default AudienceView;
