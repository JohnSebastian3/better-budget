import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";

export default function Homepage() {
  return (
    <React.Fragment>
      <Header />
      <Main />
      <Footer />
    </React.Fragment>
  );
}
