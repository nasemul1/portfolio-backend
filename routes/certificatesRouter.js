import express from 'express'
import upload from '../middlewares/multer.js'
import { addCertificate, listCertificates } from '../controllers/certificatesController.js';
import adminAuth from '../middlewares/adminAuth.js';

const certificatesRouter = express.Router();

certificatesRouter.post('/add', adminAuth, upload.single('image'), addCertificate);
certificatesRouter.get('/list', listCertificates);

export default certificatesRouter;