import { v2 as cloudinary } from 'cloudinary'
import projectsModel from '../models/projectsModel.js'

// function for add product
const addProject = async ( req, res ) => {
	try {
	    const { title, description, techStack, livePreviewLink, sourceCodeLink } = req.body;

	    const file = req.file;

		if (!file) {
		  return res.status(400).json({ message: "No image file uploaded" });
		}

		const result = await cloudinary.uploader.upload(file.path, {
		  folder: "projects",
		});

	    // Create and save the project
	    const newProject = new projectsModel({
	      title,
	      description,
	      techStack: Array.isArray(techStack) ? techStack : [techStack], // handles both array and single value
	      livePreviewLink,
	      sourceCodeLink,
	      projectImage: result.secure_url,
	    });

	    await newProject.save();

	    res.status(201).json({ message: "Project added successfully", project: newProject });
	} catch (error) {
		console.error("Add Project Error:", error);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
}

// list of projects
const listProjects = async (req, res) => {
    try {
        
        const projects = await projectsModel.find({});
        res.json({success: true, projects})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

// single project 
const singleProject = async (req, res) => {
    try {
        
        const { projectId } = req.body;
        const project = await projectsModel.findById(projectId);
        res.json({success:true, project});
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

// remove project
const removeProject = async (req, res) => {
    try {
        
        await projectsModel.findByIdAndDelete(req.body.projectId);
        res.json({success:true, message: "project Removed"})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

export { addProject, listProjects, singleProject, removeProject }