import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landing/LandingPage";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";
import AdminPage from "./pages/admin/AdminPage";
import MgPage from "./pages/mg/MgPage";
import { Toaster } from "react-hot-toast";
import NotFoundPage from "./pages/404/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sso-callback"
          element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl="/auth-callback" />}
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/mg/:slug"
          element={<div style={{ width: "100vw", height: "100vh", background: "#060610" }}><MgPage /></div>}
        />

        {/* Admin y player comparten el AuthProvider via MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/player" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
export default App;
