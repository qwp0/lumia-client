import logoImage from "@/assets/images/lumia-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 w-full px-16 py-7">
      <img
        src={logoImage}
        alt="Lumia 서비스 로고"
        className="h-15"
      />
    </header>
  );
};

export default Header;
