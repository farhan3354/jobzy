import HeaderAd from "./AdBanner";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      {/* <HeaderAd /> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
