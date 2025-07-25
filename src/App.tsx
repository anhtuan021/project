import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PhotographerListingPage from "./pages/PhotographerListingPage";
import PhotographerProfilePage from "./pages/PhotographerProfilePage";
import BookingPage from "./pages/BookingPage";
import AIToolsPage from "./pages/AIToolsPage";
import SupportPage from "./pages/SupportPage";
import PersonalProfilePage from "./pages/PersonalProfilePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import EditProfilePage from "./pages/EditProfilePage";
import BookingInvoicePage from "./pages/BookingInvoicePage";
import PhotographerDashboard from "./pages/PhotographerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfilePage from "./pages/AdminProfilePage";
import PhotographerSettingsPage from "./pages/PhotographerSettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardRouter from "./components/DashboardRouter";

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white">
            <Routes>
              {/* Auth routes without header/footer */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />

              {/* Main app routes with header/footer */}
              <Route
                path="/*"
                element={
                  <>
                    <Header />
                    <main>
                      <Routes>
                        <Route path="/" element={<DashboardRouter />} />
                        <Route
                          path="/photographers"
                          element={<PhotographerListingPage />}
                        />
                        <Route
                          path="/photographer/:id"
                          element={<PhotographerProfilePage />}
                        />
                        <Route path="/booking" element={<BookingPage />} />
                        <Route
                          path="/booking-invoice"
                          element={<BookingInvoicePage />}
                        />
                        <Route path="/ai-tools" element={<AIToolsPage />} />
                        <Route path="/support" element={<SupportPage />} />
                        <Route
                          path="/profile"
                          element={
                            <ProtectedRoute allowedUserTypes={['customer']}>
                              <PersonalProfilePage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/photographer-dashboard"
                          element={
                            <ProtectedRoute allowedUserTypes={['photographer']}>
                              <PhotographerDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/edit-profile"
                          element={
                            <ProtectedRoute>
                              <EditProfilePage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin"
                          element={
                            <ProtectedRoute allowedUserTypes={['admin']}>
                              <AdminDashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin-profile"
                          element={
                            <ProtectedRoute allowedUserTypes={['admin']}>
                              <AdminProfilePage />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/photographer-settings"
                          element={
                            <ProtectedRoute allowedUserTypes={['photographer']}>
                              <PhotographerSettingsPage />
                            </ProtectedRoute>
                          }
                        />
                      </Routes>
                    </main>
                    <Footer />
                  </>
                }
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
