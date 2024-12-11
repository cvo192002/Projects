import * as users from './api/users/index.js';
import path from 'path';
import express from 'express'; 

export default (app) => {
    app.use(express.static("public"));
    app.use('/api/users', users.router);
    app.use("/*", (req, res) => {
        res.sendFile(path.resolve(`public/index.html`));
    });
}