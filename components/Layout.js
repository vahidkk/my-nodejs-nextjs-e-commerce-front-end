import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout(props) {
  return (
    <div>
      <Navbar />
      {/* the header nav bar goes here  */}
      <main>{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
