import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { injectGlobal } from 'styled-components';

injectGlobal`
    * {
        box-sizing: border-box;
    }
    body {
        background-color: snow;
    }
    
`;

export default class MyCustomDocument extends Document {
    static getInitialProps ({ renderPage }) {
        const sheet = new ServerStyleSheet();
        const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
        const styleTags = sheet.getStyleElement();
        return { ...page, styleTags } // return styles collected
    }

    render () {
        return (
            <html>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <title>Kudos Publication App</title>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css" />
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Playfair+Display:400,700" rel="stylesheet" />
                    {this.props.styleTags}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    <div id="modal-root"></div>
                </body>
            </html>
        );
    }
}