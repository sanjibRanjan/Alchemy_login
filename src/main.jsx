import { StrictMode } from "react";
import { Buffer } from 'buffer';

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { AlchemyAccountProvider } from "@account-kit/react";
import { config, queryClient } from "../config.js";
import "../global.css";
import { BrowserRouter, Routes, Route } from "react-router";
import NftMintingPlatform from "./Components/NftMintingPlatform.jsx";
import { Auth0Provider } from "@auth0/auth0-react"; // ✅ import this

window.Buffer = Buffer;
const domain = "dev-1y5fr70degyn6o3c.us.auth0.com";        
const clientId = "z4eRP7kKQvhpzgQFYX2q4FLnaxDytTxE";   

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <QueryClientProvider client={queryClient}>
        <AlchemyAccountProvider config={config} queryClient={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/nft-minting-platform" element={<NftMintingPlatform />} />
            </Routes>
          </BrowserRouter>
        </AlchemyAccountProvider>
      </QueryClientProvider>
    </Auth0Provider>
  </StrictMode>
);
