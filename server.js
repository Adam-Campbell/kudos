const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
.then(() => {
    const server = express();
    
    server.use(express.static(__dirname + '/uploads'))

    server.get('/category/:category', (req, res) => {
        const url = '/category';
        const params = { category: req.params.category };
        app.render(req, res, url, params);
    });

    server.get('/post/:post', (req, res) => {
        const url = '/post';
        const params = { post: req.params.post };
        app.render(req, res, url, params)
    });

    server.get('/user/:user/', (req, res) => {
        const url = '/user';
        const params = { user: req.params.user, filter: 'posts' };
        app.render(req, res, url, params)
    });

    server.get('/user/:user/:filter', (req, res) => {
        const url = '/user';
        const params = { user: req.params.user, filter: req.params.filter };
        app.render(req, res, url, params)
    });

    server.get('/edit-post/:post', (req, res) => {
        const url = '/edit-post';
        const params = { post: req.params.post };
        app.render(req, res, url, params);
    });

    server.get('/reset/:resetPasswordToken', (req, res) => {
        const url = '/reset';
        const params = { resetPasswordToken: req.params.resetPasswordToken };
        app.render(req, res, url, params);
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });

    server.listen(3000, (err) => {
        if (err) throw err;
        console.log('> Ready on http://localhost:3000');
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
});