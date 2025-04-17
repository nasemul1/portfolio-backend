import mongoose from 'mongoose'

const projectsSchema = new mongoose.Schema({
		title: { type: String, required: true, trim: true },
		description: { type: String, required: true },
		projectImage: { type: String, required: true },
		techStack: [
			{
			  type: String,
			  required: true,
			}
		],
		livePreviewLink: { type: String, required: true },
		sourceCodeLink: { type: String, required: true },
	}, {
	timestamps: true,
});

const projectsModel = mongoose.models.projects || mongoose.model("projects", projectsSchema);

export default projectsModel