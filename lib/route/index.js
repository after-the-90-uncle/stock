var router = require('koa-router')();

import file from "./file";
import authority from "./authority";


router.use('/file', file.routes(), file.allowedMethods());
router.use('/authority', authority.routes(), authority.allowedMethods());


export default router;
