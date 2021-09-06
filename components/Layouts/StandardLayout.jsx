import Header from "../Header";

const StandardLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default StandardLayout;
