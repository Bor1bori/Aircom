import React from 'react';
import { wrapper } from '../store/store'

const WrappedApp = ({ Component, pageProps }: {Component: any; pageProps: any}) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)
