var router = require('koa-router')();
import excelToJson from "convert-excel-to-json";

import fs from 'fs';
import ByteBuffer from 'bytebuffer';
import path from 'path';
import asyncBusboy from '../common/parsefile';
import db from 'mime-db';
var uuid = require('node-uuid');
import util from 'util';


import api from '../api';

//ckeditor 上传图片
router.post('/ckeditor-upload-image',async (ctx,next) => {
	var {CKEditor,CKEditorFuncNum,langCode} = ctx.request.query; 
	const {files, fields} = await asyncBusboy(ctx.req);
    var file = files[0];

    var filePath = uploadFile(file);

	ctx.body = `<script>window.parent.CKEDITOR.tools.callFunction(${CKEditorFuncNum},'${filePath}','')</script>`
});


//普通上传图片
router.post('/upload-image',async (ctx,next) => {
    const {files, fields} = await asyncBusboy(ctx.req);
    var file = files[0];
    ctx.body = uploadFile(file);
});

//普通上传
router.post('/upload-file',async (ctx,next) => {

    const {files, fields} = await asyncBusboy(ctx.req);
    var file = files[0];
    ctx.body = uploadFile(file);
});

function uploadFile(file){
    var content = fs.readFileSync(file.path),
     filename = file.filename;

    var nonce_str = uuid.v4().replace(/-/g, ""),
        dirname = `/resource/${nonce_str}`+filename.match(/.(\w+)$/)[0],
        file_path = path.resolve(process.cwd(),`../${dirname}`);
    fs.writeFileSync(file_path, content);

    return dirname;
}

//上传excel
router.post('/parse-execl',async(ctx, next) =>{
    var {files} = await asyncBusboy(ctx.req);
    var file = files[0];
    var convertJson = excelToJson({
        sourceFile: file.path
    });
    ctx.body = findPhones(convertJson);
});

function findPhones(data){
    var phones=[];
    function get(data){
        if(util.isArray(data)){
            data.forEach((item)=>{
                get(item);
            })

        }else if(util.isObject(data)){
            for(var item in data){
                get(data[item]);
            }
        }else if(/^1\d{10}$/.test(data)){
            phones.push(data);
        }
        
    }
    get(data);
    return phones;
    
}

export default router;