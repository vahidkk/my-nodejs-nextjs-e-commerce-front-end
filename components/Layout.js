import Navbar from "./Navbar";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

function Layout(props) {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}

export default Layout;
