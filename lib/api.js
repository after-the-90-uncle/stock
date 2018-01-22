import http from "http";
import config from "./config";
import querystring from "querystring";

export default function api(app) {
    app.use(async(ctx, next) => {
    	
        await next();
    });
}



    
 
