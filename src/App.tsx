import React from "react";
import "./App.css";
import "@farcaster/auth-kit/styles.css";
import {
  AuthKitProvider,
  SignInButton,
  useProfile,
  useSignInMessage,
} from "@farcaster/auth-kit";

const config = {
  rpcUrl: "https://mainnet.optimism.io",
};

export const UserProfile = () => {
  const {
    isAuthenticated,
    profile: {
      fid,
      username,
      displayName,
      pfpUrl,
      bio,
      custody,
      verifications,
    },
  } = useProfile();
  const { message, signature } = useSignInMessage();
  console.log("Message", message);
  console.log("Signature", signature);
  return (
    <div className="UserProfile">
      {isAuthenticated ? (
        <>
          <p>
            Hello, {displayName}! Your fid is: {fid}
          </p>
          <img className="pfpImg" src={pfpUrl} alt="Profile" />
          <br />
          <code>
            <a
              href={`https://warpcast.com/${username}`}
              target="_blank"
              rel="noreferrer"
            >
              @{username}
            </a>
            <div className="bio">{bio}</div>
            <div className="more-details">
              <div>
                Custody Address:{" "}
                <a
                  href={`https://optimistic.etherscan.io/address/${custody}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {custody}
                </a>
              </div>
              <div>
                Verifications:{" "}
                <a
                  href={`https://optimistic.etherscan.io/address/${verifications}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {verifications}
                </a>
              </div>
            </div>
          </code>
        </>
      ) : (
        <p>You're not signed in.</p>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthKitProvider config={config}>
      <div className="App">
        <header className="App-header">
          <SignInButton />
          <UserProfile />
          <div className="source-code">
            <a
              href="https://github.com/shahbaz17/farcaster-auth-kit"
              target="_blank"
              rel="noreferrer"
            >
              Source Code
            </a>{" "}
          </div>
        </header>
      </div>
    </AuthKitProvider>
  );
}

export default App;
