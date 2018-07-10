/*
Authentication tokens are stored on the client as httpOnly cookies, and sent along with each request to
the API. However, when a server side render takes place for whatever reason, the request is coming from the 
server and not from the browser containing the cookies. This function is only run on server side renders, 
and pulls the cookies from the browsers request headers, passing them into the app so that they can be injected
into the API calls. 

Always returns an object with token and refreshToken properties, so with destructuring it can be used 
declaratively like so:

const { token, refreshToken } = retrieveAuthTokensOnSSR(isServerm req);

Whatever it returns can just be passed onto the next functions that require it without having to worry
about whether it returns null or an actual token value.

Its arguments isServer and req both come from the NextJS getInitialProps function.

*/

export const retrieveAuthTokensOnSSR = (isServer, req) => {
    // By default we will return null values for token and refreshToken
    let tokenObject = {
        token: null,
        refreshToken: null
    };
    // if this is an SSR and the cookies are present, updated tokenObject with the cookie values.
    if (isServer && req && req.cookies) {
        if (req.cookies.token) {
            tokenObject.token = req.cookies.token;
        }
        if (req.cookies.refreshToken) {
            tokenObject.refreshToken = req.cookies.refreshToken;
        }
    }
    
    return tokenObject;
}