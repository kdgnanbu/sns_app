import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import RegisterSuccessPage from "./pages/RegisterSuccessPage";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LikePage from "./pages/LikePage";
import SettingPage from "./pages/SettingPage";
import PostDetail from "./pages/PostDetail";

import { PopupProvider } from "./context/PopupContext";

export default function App() {
  return (
    <PopupProvider>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register-success" element={<RegisterSuccessPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/likes" element={<LikePage />} />
        <Route path="/settings" element={<SettingPage />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
      <Footer />
    </PopupProvider>
  );
}
