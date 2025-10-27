import Header from "../components/Header";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen bg-[url('./background.jpg')] bg-cover bg-center">
      <Navigation />
      <Header />
    </div>
  );
};

export default Home;
