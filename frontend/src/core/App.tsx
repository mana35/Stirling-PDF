import { Suspense, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AppProviders } from "@app/components/AppProviders";
import { AppLayout } from "@app/components/AppLayout";
import { LoadingFallback } from "@app/components/shared/LoadingFallback";
import { RainbowThemeProvider } from "@app/components/shared/RainbowThemeProvider";
import { PreferencesProvider } from "@app/contexts/PreferencesContext";
import HomePage from "@app/pages/HomePage";
import MobileScannerPage from "@app/pages/MobileScannerPage";
import Onboarding from "@app/components/onboarding/Onboarding";

// Import global styles
import "@app/styles/tailwind.css";
import "@app/styles/cookieconsent.css";
import "@app/styles/index.css";

// Embedded mode detection - adds class to body when ?embedded=true
function useEmbeddedMode() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isEmbedded = params.get('embedded') === 'true';
    if (isEmbedded) {
      document.body.classList.add('embedded-mode');
    } else {
      document.body.classList.remove('embedded-mode');
    }
    return () => {
      document.body.classList.remove('embedded-mode');
    };
  }, []);
}

// Import file ID debugging helpers (development only)
import "@app/utils/fileIdSafety";

// Minimal providers for mobile scanner - no API calls, no authentication
function MobileScannerProviders({ children }: { children: React.ReactNode }) {
  return (
    <PreferencesProvider>
      <RainbowThemeProvider>
        {children}
      </RainbowThemeProvider>
    </PreferencesProvider>
  );
}

export default function App() {
  // Detect and apply embedded mode styling
  useEmbeddedMode();
  
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Mobile scanner route - no backend needed, pure P2P WebRTC */}
        <Route
          path="/mobile-scanner"
          element={
            <MobileScannerProviders>
              <MobileScannerPage />
            </MobileScannerProviders>
          }
        />

        {/* All other routes need AppProviders for backend integration */}
        <Route
          path="*"
          element={
            <AppProviders>
              <AppLayout>
                <HomePage />
                <Onboarding />
              </AppLayout>
            </AppProviders>
          }
        />
      </Routes>
    </Suspense>
  );
}
