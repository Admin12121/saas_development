import Landing from "./_components/landing";
import Navbar from "./_components/navbar";
import Parallax from "@/components/global/parallex/Parallex";
const Homepage = () => {
  return (
    <section className="flex items-center bg-white flex-col">
      <Navbar />
      <Parallax>
        <Landing />
      </Parallax>
      <div className="h-screen">

      </div>
    </section>
  );
};

export default Homepage;
