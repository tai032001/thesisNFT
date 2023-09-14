import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";
import Head from "next/head";
import { url } from "inspector";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={Sepolia}
    >
      <div
        style={{
          backgroundImage: `url('/images/background.webp')`,
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Head>
          <link rel="icon" href="/images/monster.ico" />
          <title>ThesisGame</title>
        </Head>
        <Component {...pageProps} />
      </div>
    </ThirdwebProvider>
  );
}

export default MyApp;
