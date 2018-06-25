import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import * as styleConstants from '../components/styleConstants'; 
import { injectGlobal } from 'styled-components';

injectGlobal`
    * {
        box-sizing: border-box;
    }
    body {
        background-color: snow;
    }
    .DraftEditor-root {
        padding: 0;
        figure {
            margin-left: auto;
            margin-right: auto;
        }
    }
    .public-DraftEditorPlaceholder-root {
        color: #aaa;
        font-family: ${styleConstants.fontSecondary};
        font-size: 16px;
        font-weight: 400;
        position: absolute;
        width: 100%;
    }
    #placeholder-articleTitleEditor {
        font-family: ${styleConstants.fontPrimary};
        font-weight: 700;
        font-size: 36px;
        color: #aaa;
        margin: 0; 
    }
    #placeholder-articleEditor {
        padding: 16px;
        max-width: 832px;
        margin-left: auto;
        margin-right: auto;
        margin-top: 16px;
    }
    .article-editor__h1 {
        font-family: ${styleConstants.fontPrimary};
        font-weight: 700;
        font-size: 36px;
        color: ${styleConstants.colorBodyText};
        margin: 0;
    }
    .article-editor__h2 {
        font-family: ${styleConstants.fontSecondary};
        font-weight: 400;
        font-size: 24px;
        color: ${styleConstants.colorBodyText};
    }
    .comment-editor__h1 {
        font-family: ${styleConstants.fontPrimary};
        font-weight: 700;
        font-size: 36px;
        color: ${styleConstants.colorBodyText};
    }
    .comment-editor__h2 {
        font-family: ${styleConstants.fontSecondary};
        font-weight: 400;
        font-size: 24px;
        color: ${styleConstants.colorBodyText};
    }
    .comment-editor__h3 {
        font-family: ${styleConstants.fontSecondary};
        font-weight: 700;
        font-size: 24px;
        color: ${styleConstants.colorBodyText};
    }
    .comment-editor__paragraph,
    .comment-editor__unstyled,
    .comment-editor__ul-item,
    .comment-editor__ol-item {
        font-family: ${styleConstants.fontSecondary};
        font-weight: 300;
        font-size: 16px;
        color: ${styleConstants.colorBodyText};
        line-height: 1.4;
    }
    .comment-editor__unstyled {
        margin-top: 16px;
        margin-bottom: 16px;
    }
    .comment-editor__paragraph {
        color: blue;
    }
    .comment-editor__block-quote {
        font-family: ${styleConstants.fontPrimary};
        font-style: italic;
        font-size: 20px;
        color: ${styleConstants.colorBodyText};
        font-weight: bold;
        border-left: solid 3px ${styleConstants.colorBodyText};
        padding-left: 16px; 
        margin: 32px 16px;
    }
    .article-editor__block-quote {
        font-family: ${styleConstants.fontPrimary};
        font-style: italic;
        font-size: 20px;
        color: ${styleConstants.colorBodyText};
        font-weight: bold; 
    }
    .comment-editor__code-block {
        font-family: ${styleConstants.fontCode};
        color: snow;
        background-color: transparent;
        padding: 0;
        white-space: normal;
    }
    .article__isolated-title {
        font-family: ${styleConstants.fontPrimary};
        color: ${styleConstants.colorBodyText};
        margin-top: 8px;
        margin-bottom: 8px;
    }
    .article__isolated-description {
        font-family: ${styleConstants.fontSecondary};
        font-weight: 300;
        font-size: 16px;
        color: ${styleConstants.colorBodyText};
        margin-top: 0;
        margin-bottom: 16px;
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