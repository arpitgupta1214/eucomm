import Header from "../Header";
const Layout = ({ children, ...props }) => {
  return (
    <>
      <Header currentPage={props.currentPage} />
      {children}
    </>
  );
};

export default Layout;
