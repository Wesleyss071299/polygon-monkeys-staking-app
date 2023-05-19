/* eslint-disable @next/next/no-title-in-document-head */
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

import { COLLECTION_NAME } from '../../constants';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          {/* <!-- Primary Meta Tags --> */}
          <link rel="shortcut icon" href="/favi.png" type="image/png" />
          <meta name="title" content={`${COLLECTION_NAME} Staking`} />{' '}
          <meta name="description" content={`${COLLECTION_NAME} Staking`} />
          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={`${COLLECTION_NAME}`} />
          <meta property="og:description" content={`${COLLECTION_NAME}`} />
          <meta property="og:image" content="/logo-black" /> {/* Mudar aqui */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
            rel="stylesheet"
          />
          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:title" content={`${COLLECTION_NAME}`} />
          <meta
            property="twitter:description"
            content={`${COLLECTION_NAME} Staking`}
          />
          <meta property="twitter:image" content="/logo-black" />
        </Head>
        <body>
          <Main />
          <div id="modal-portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
