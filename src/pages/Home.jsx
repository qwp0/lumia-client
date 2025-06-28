import Header from "@/components/home/Header";
import Slogan from "@/components/home/Slogan";
import Uploader from "@/components/home/Uploader";

const Home = () => {
  return (
    <main className="flex h-full min-h-screen flex-col justify-center bg-[#08090A] text-white">
      <Header />
      <div className="flex flex-col items-center gap-30 py-30">
        <Slogan />
        <Uploader />
      </div>
    </main>
  );
};

export default Home;
