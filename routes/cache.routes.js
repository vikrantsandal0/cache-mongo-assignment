import * as cacheControllers from "../controllers/cache.controllers";
import { Router } from "express"
const router = Router();

router.route('/')
    /** get all keys */
    .get(cacheControllers.getAllKeys)

    /** delete all keys */
    .delete(cacheControllers.deletekey);

router.route('/:key')
    /** get or create particular key */
    .get(cacheControllers.getkeyValue)

    /** create or update a key-value */
    .post(cacheControllers.createUpdateKeyValue)

     /** delete a partcular key */
    .delete(cacheControllers.deletekey);




export default router;