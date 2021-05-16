import { AppProps } from 'next/app';
import { FunctionComponent } from 'react';
import '../globals.scss';

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />; /* eslint-disable-line */
};

export default App;
