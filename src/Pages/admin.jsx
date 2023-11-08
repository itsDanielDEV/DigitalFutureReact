import NavbarGuest from "../components/NavbarGuest";
import Footer from "../components/Footer";
import CartPanel from "../components/CartPanel";
import SalesDashboard from "../components/SalesDashboard";

function Admin() {
  return (
    <div className="w-100 index-container">
      <NavbarGuest adminMode={true} />
      <main>
        <SalesDashboard />
      </main>
      <CartPanel />
      <Footer />
    </div>
  );
}

export default Admin;
