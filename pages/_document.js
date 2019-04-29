import React from 'react'
import PropTypes from 'prop-types'
import Document, {Head, Main, NextScript} from 'next/document';
// Import styled components ServerStyleSheet
import flush from 'styled-jsx/server';
import {ServerStyleSheet} from 'styled-components';

export default class MyDocument extends Document {


    static getInitialProps({renderPage}) {
        // Step 1: Create an instance of ServerStyleSheet
        const sheet = new ServerStyleSheet();

        let emotionStyles;

        // Render app and page and get the context of the page with collected side effects.
        let pageContext;

        // Step 2: Retrieve styles from components in the page
        const page = renderPage((App) => {
                const WrappedComponent = props => {
                    pageContext = props.pageContext;


                    return sheet.collectStyles(<App {...props} />)
                };

                WrappedComponent.propTypes = {
                    pageContext: PropTypes.object.isRequired,
                };

                return WrappedComponent;
            }
        );

        // Step 3: Extract the styles as <style> tags
        const styleTags = sheet.getStyleElement();



        let css;
        // It might be undefined, e.g. after an error.
        if (pageContext) {
            css = pageContext.sheetsRegistry.toString();
        }


        // Step 4: Pass styleTags as a prop
        // return {...page, styleTags};

        return {
            pageContext,
            ...page,
            styleTags,
            // Styles fragment is rendered after the app and page rendering finish.
            styles: (
                <React.Fragment>
                    <style
                        id="jss-server-side"
                        // eslint-disable-next-line react/no-danger
                        dangerouslySetInnerHTML={{__html: css}}
                    />
                    {flush() || null}
                </React.Fragment>
            ),
        };
    }

    render() {
        return (
            <html>
            <Head>
                {/* Step 5: Output the styles in the head  */}
                {this.props.styleTags}
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        );
    }
}