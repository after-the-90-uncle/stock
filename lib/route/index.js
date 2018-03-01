var router = require('koa-router')();

import file from "./file";
import authority from "./authority";
import user from "./user";


router.use('/file', file.routes(), file.allowedMethods());
router.use('/authority', authority.routes(), authority.allowedMethods());
router.use('/user', user.routes(), user.allowedMethods());


export default router;
