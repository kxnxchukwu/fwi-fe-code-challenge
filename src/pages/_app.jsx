import Head from 'next/head';

import './app.scss';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>FWI Poker Challenge</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
