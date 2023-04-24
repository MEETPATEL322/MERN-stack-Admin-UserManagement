import express from 'express';
const router = express.Router();
import AddController from '../controllers/AddController.js';
import AddModel from '../models/Add.js';

// const upload = require("../multerconfig/storageConfig.js")

import upload from '../multerconfig/storageConfig.js'

router.post('/Add',upload.single("user_profile"),AddController.addRegister);
router.get('/List', AddController.getRegister);
router.get('/List/:id', AddController.getsingleRegister);
router.put('/edit/:id',upload.single("user_profile"),AddController.updateRegister);
router.delete('/delete/:id', AddController.deleteRegister);

router.put("/status/:id", AddController.status)
router.get("/export",AddController.exportdata)



export default router