const express = require("express");
const app = express();
const port = 3000;

require('svelte/register');
const App = require('./src/App.svelte').default;
const Sass = require('./public/build/ssr/Sass.js');

const template = (head, html, css, bundle) => `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset='utf-8'>
        <meta name='viewport' content='width=device-width,initial-scale=1'>

        <title>Svelte app</title>

        <link rel='icon' type='image/png' href='/favicon.png'>
        <link rel='stylesheet' href='/global.css'>
        ${head}
        <style>${css.code}</style>
        <script defer type='module' src='/build/${bundle}.js'></script>
    </head>

    <body>${html}</body>
    </html>
`;

app.use(express.static("public"));
app.get("/ssr", (req, res) => {
    const { head, html, css } = App.render({
        name: 'World'
    });
    res.send(template(head, html, css, 'main'));
});
app.get("/ssr/sass", (req, res) => {
    const { head, html, css } = Sass.render({
        name: 'World'
    });
    res.send(template(head, html, css, 'sass'));
});

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
