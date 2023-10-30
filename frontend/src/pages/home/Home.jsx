import Banner from "../../components/banner/Banner";
import Newsletter from "../../components/newsletter/Newsletter";
import Footer from "../../components/footer/Footer";

function Home() {
  return (
    <>
      <main className="main">
        <Banner />
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
export default Home;
