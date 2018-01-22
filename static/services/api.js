
import $ from 'jquery';

module.exports= function api(url, request){
    return new Promise((resolve, reject)=>{
        $.ajax({
            url,
            data:request,
            type:'POST',
            success:(data)=>{
                if(data.cd==102){
                    location.href=`/login?next=${data.path}`
                }
                resolve(data);
            }
        })
    });
}
