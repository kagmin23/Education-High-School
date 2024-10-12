import Features from "./features";
import Header from "./header";
import HeroSection from "./hero-section";


const HomepageParent = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Features />
      {/* <Footer /> */}
    </div>
  );
};

export default HomepageParent;
