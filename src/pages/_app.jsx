import Head from 'next/head';
import { Provider } from 'react-redux';

import { useStore } from '../appState/store';
import './app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Head>
        <title>FWI Poker Challenge</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}
