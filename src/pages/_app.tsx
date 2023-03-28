import "@src/styles/globals.css";
import { csrfTokenGetFetcher } from "@src/components/fetcher/LoginFetcher";
import Layout from "@src/components/module/frame/Layout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { Session } from "next-auth";

const App = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) => {
  const router = useRouter();
  const { data } = useSWR("/api/csrf-token", csrfTokenGetFetcher);

  return (
    <SessionProvider
      session={session}
      refetchInterval={5 * 60}
      refetchOnWindowFocus={true}>
      <SWRConfig value={{ provider: () => new Map() }}>
        <Head>
          <title>Collabo Board</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
};
export default App;
