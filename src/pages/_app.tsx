import "@src/styles/globals.scss";

import Layout from "@src/components/module/frame/Layout";
import type { AppProps } from "next/app";

import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { Session } from "next-auth";
import { Provider } from "react-redux";
import store from "@src/redux/store";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}>
      <SWRConfig value={{ provider: () => new Map() }}>
        <Provider store={store}>
          <Head>
            <title>Collabo Board</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link
              rel="icon"
              href="/favicon.ico"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </SWRConfig>
    </SessionProvider>
  );
};
export default App;
