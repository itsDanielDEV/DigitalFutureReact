import NavbarGuest from "../components/NavbarGuest";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import ProductsSection from "../components/ProductsSection";

function Index() {
  return (
    <div className="index-container">
      <NavbarGuest homeMode={false} />
      <Carousel />
      <main>
        <ProductsSection homeMode={false} />
      </main>
      {/* <h1>Index</h1>
      <Link to="./home">Home</Link>
      <Link to="./login">Login</Link>
      <Link to="./logup">Logup</Link>
      <Link to="./admin">Admin</Link> */}
      <Footer />
    </div>
  );
}

export default Index;
