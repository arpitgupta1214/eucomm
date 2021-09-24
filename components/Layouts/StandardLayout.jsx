import Footer from "components/Footer";
import Header from "../Header";

const StandardLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default StandardLayout;
