const sessionid = 'stock-admin-sessionid';
import api from "../api";
import utils from '../utils';

export default function stoken(ctx, mode) {
     
    Object.defineProperty(ctx, 'token', {
        get: () => {
            return ctx.cookies.get(sessionid, {
                signed: true,
                httpOnly: true
            });
        },
        set: (value) => {
            ctx.cookies.set(sessionid, value, {
                signed: true,
                httpOnly: true
            });
        }
    });

    ctx.sess = async(session) => {
        if(session){
            ctx.token = session;
        }
        return utils.verifyJwt(ctx.token);

    };
    ctx.clearSess = async () =>{
    }
}
