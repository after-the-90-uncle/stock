import ctx_http_info from './ctx_http_info';
import ctx_stoken from './ctx_stoken';

export default function index(app) {
    app.use(async(ctx, next) => {

        ctx_http_info(ctx);
        ctx_stoken(ctx);
        await next();
    });
}
