import { Route, Routes } from "react-router-dom";

import { Header } from "./components/Header";
import { MainPage } from "./pages/MainPage";

import "./scss/App.scss";

function App() {
  return (
    <section>
      <>
        <Header />
        <Routes>
          <Route index element={<MainPage />} />
        </Routes>
      </>
    </section>
  );
}

export default App;
