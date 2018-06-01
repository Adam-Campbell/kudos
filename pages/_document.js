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
    .DraftEditor-root {
        padding: 16px;
    }
    .public-DraftEditorPlaceholder-root {
        color: #aaa;
        font-family: 'Open Sans', sans-serif;
        font-size: 16px;
        font-weight: 400;
        margin-bottom: -16px;
    }
    .comment-editor__h1 {
        font-family: 'Open Sans', sans-serif;
        font-weight: 700;
        font-size: 48px;
        color: #333
    }
    .comment-editor__h2 {
        font-family: 'Open Sans', sans-serif;
        font-weight: 700;
        font-size: 32px;
        color: #333;
    }
    .comment-editor__h3 {
        font-family: 'Open Sans', sans-serif;
        font-weight: 700;
        font-size: 24px;
        color: #333;
    }
    .comment-editor__paragraph,
    .comment-editor__unstyled,
    .comment-editor__ul-item,
    .comment-editor__ol-item {
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;
        font-size: 16px;
        color: #333;
        line-height: 1.4;
    }
    .comment-editor__paragraph {
        color: blue;
    }
    .comment-editor__block-quote {
        font-family: 'Playfair Display', serif;
        font-style: italic;
        font-size: 20px;
        color: #333;
        font-weight: bold;
        border-left: solid 3px #333;
        padding-left: 16px; 
        margin: 32px 16px;
    }
    .comment-editor__code-block {
        font-family: 'Roboto Mono', monospace;
        color: snow;
        background-color: transparent;
        padding: 0;
        white-space: normal;
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
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600|Playfair+Display:400,700|Roboto+Mono" rel="stylesheet" />
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