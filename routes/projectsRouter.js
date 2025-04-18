import express from 'express'
import upload from '../middlewares/multer.js'
import { addProject, listProjects, removeProject, singleProject } from '../controllers/projectsController.js';
import adminAuth from '../middlewares/adminAuth.js';

const projectsRouter = express.Router();

projectsRouter.post('/add', adminAuth, upload.single('image'), addProject);
projectsRouter.get('/list', listProjects);
projectsRouter.post('/single', singleProject);
projectsRouter.post('/remove', adminAuth, removeProject);

export default projectsRouter;