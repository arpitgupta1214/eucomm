import Footer from "components/Footer";
import Header from "../Header";

const StandardLayout = ({ children }) => {
  return (
    <>
      <div className="w-full max-w-content mx-auto">
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default StandardLayout;
