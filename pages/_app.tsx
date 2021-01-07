import React from 'react';
import '../styles/styles.css';
import { AppProps } from 'next/app';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
