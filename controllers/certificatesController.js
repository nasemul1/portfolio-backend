import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import certificatesModel from '../models/certificatesModel.js';

// add certificate route
const addCertificate = async ( req, res ) => {
	try {
		const { title, link } = req.body;
		const file = req.file;

		if(!file){
			return res.status(400).json({ message: "No image file uploaded" });
		}

		const streamUpload = (fileBuffer) => {
		  return new Promise((resolve, reject) => {
		    const stream = cloudinary.uploader.upload_stream(
		      { folder: "projects" },
		      (error, result) => {
			        if (result) resolve(result);
			        else reject(error);
			      }
			    );

		    	streamifier.createReadStream(fileBuffer).pipe(stream);
			});
		};

		const result = await streamUpload(file.buffer);

		const newCertificate = new certificatesModel({
			title,
			link,
			image: result.secure_url,
		});

		await newCertificate.save();

		res.status(201).json({ message: "Project added successfully", certificate: newCertificate });

	} catch {
		console.error("Add Certificate Error:", error);
		res.status(500).json({ message: "Server Error", error: error.message });
	}
}

// list of certificate route
const listCertificates = async (req, res) => {
    try {
        
        const certificates = await certificatesModel.find({});
        res.json({success: true, certificates})

    } catch (error) {
        console.log(error);
        res.json({success:false, message: error.message})
    }
}

export { addCertificate, listCertificates };