import React, {useEffect} from 'react'
import { useNavigate } from "react-router";



import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";

export default function App() {
  const user = useUser();
  const { openAuthModal , } = useAuthModal();
  const signerStatus = useSignerStatus();
  const { logout } = useLogout();


  let navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/nft-minting-platform");
  }, [user])

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-4 justify-center text-center">
      { user ? (
        <div className="flex flex-col gap-2 p-2">
          <p className="text-xl font-bold">Success!</p>
          You're logged in as {user.email ?? "anon"}.<button
            className="akui-btn akui-btn-primary mt-6"
            onClick={() => logout()}
          >
            Log out
          </button>
        </div>
      ) : (
        <button className="akui-btn akui-btn-primary" onClick={openAuthModal}>
          Login
        </button>
      )}
    </main>
  );
}
