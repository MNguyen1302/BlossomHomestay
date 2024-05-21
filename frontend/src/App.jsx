import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePlace from "./pages/CreatePlace";
import PlaceDetail from "./pages/PlaceDetail";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-place" element={<CreatePlace />} />
        <Route path="/place/:placeId" element={<PlaceDetail />} />
      </Routes>
    </div>
  );
};

export default App;
