import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Newsletter from "../components/newsletter/Newsletter";
import Footer from "../components/footer/Footer";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Newsletter />
      <Footer />
    </>
  );
}
export default Layout;
