import Layout from '@/components/Layout';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import '@/styles/fonts.css';
import Seo from '@/components/Seo';

export default function App({ Component, pageProps }: AppProps) {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  }, []);

  return (
    <React.Fragment>
      <Seo />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.Fragment>
  );
}
