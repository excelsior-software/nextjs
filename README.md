# nextjs
This is NEXT.JS scaffolding with preinstalled plugins &amp; settings that are commonly used.

By default it implements SSR for styled-components and CSS-IN-JS.
To disable it just remove **_app.js** and **_document.js** files.

# Installed plugins & tools
- SASS
- CSS Modules
- POSTCSS
  - CSS Variables
  - AutoPrefixer
- Storybook
- Styled-components
- Material UI
- React Bootstrap
  
# Installed fonts
- Bebase Neue
- Montserrat
- Roboto

# Styled-components only 
To enable SSR for **Styled-Components** create **_document.js** with the following code:
```
import Document, { Head, Main, NextScript } from 'next/document';
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <title>My page</title>
          {/* Step 5: Output the styles in the head  */}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
```