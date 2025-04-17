import express from 'express'
import upload from '../middlewares/multer.js'
import { addProject, listProjects, removeProject, singleProject } from '../controllers/projectsController.js';

const projectsRouter = express.Router();

projectsRouter.post('/add', upload.single('image'), addProject);
projectsRouter.get('/list', listProjects);
projectsRouter.post('/single', singleProject);
projectsRouter.post('/remove', removeProject);

export default projectsRouter;