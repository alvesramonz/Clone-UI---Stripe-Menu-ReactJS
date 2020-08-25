import React from "react";

import GlobalStyles from "./styles/global";
import  Layout  from "./components/Layout/index";
import  Navbar  from "./components/Navbar/index";

function App() {
  return (
    <>
      <Layout>
        <Navbar />
      </Layout>

      <GlobalStyles />
    </>
  );
}

export default App;
