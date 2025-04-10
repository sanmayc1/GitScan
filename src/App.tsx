import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BaseLayout from "./components/layout/BaseLayout";
import SearchUserProfile from "./pages/SearchUserProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BaseLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/searchuser" element={<SearchUserProfile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
