import NavbarGuest from "../components/NavbarGuest";
import Carousel from "../components/Carousel";
import ProductsSection from "../components/ProductsSection";
import Footer from "../components/Footer";
import CartPanel from "../components/CartPanel";

function Home() {
  return (
    <div className="index-container">
      <NavbarGuest homeMode={true} />
      <Carousel />
      <main>
        <ProductsSection homeMode={true} />
      </main>
      <CartPanel />
      <Footer />
    </div>
  );
}

export default Home;
