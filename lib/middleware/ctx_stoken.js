const sessionid = 'yfq-admin-sessionid';
const userid = 'yfq-admin-usc';
const username = 'yfq-admin-username';
import api from "../api";


export default function stoken(ctx, mode) {
     
    Object.defineProperty(ctx, 'ticket', {
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


    var session;
    ctx.sess = async(session0) => {
    };
    ctx.clearSess = async () =>{
    }
}
