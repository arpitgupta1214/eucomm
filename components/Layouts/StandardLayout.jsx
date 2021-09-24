import Footer from "components/Footer";
import Header from "../Header";

const StandardLayout = ({ config, children }) => {
  return (
    <>
      <Header config={config} />
      {children}
      <Footer config={config} />
    </>
  );
};

export default StandardLayout;
