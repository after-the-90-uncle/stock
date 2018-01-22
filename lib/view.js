import mount from 'koa-mount';
import serve from 'koa-static';
import sendfile from 'koa-sendfile';
import path from 'path';

import {dev} from './config';


var view_path=path.resolve(__dirname, '../static/');

var router = require('koa-router')();



router.redirect('/', '/login');
router.get('/authority/:path*',sendFileIndex );
router.get('/login',sendFileIndex );
router.get('/home',sendFileIndex );

async function sendFileIndex(ctx, next){
	await sendfile(ctx, `${view_path}/index.html`);
}

export default function(app){
    app.use(serve(__dirname+ '/'+ '../dist'));
    app.use(mount('/resource', serve(__dirname + '/' + '../../resource')));
    app.use(mount('/node_modules', serve(__dirname + '/' + '../node_modules')));
    app.use(router.routes()).use(router.allowedMethods());
}
