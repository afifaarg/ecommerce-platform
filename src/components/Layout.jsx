import Navbar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Banner from "./Banner";

export default function Layout() {
  return (
    <>
      <div className="flex flex-col justify-between min-h-screen">
        <Banner />
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
