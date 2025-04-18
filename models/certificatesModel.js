import mongoose from 'mongoose'

const certificatesSchema = new mongoose.Schema({
		title: { type: String, required: true, trim: true },
		image: { type: String, required: true },
		link: { type: String, required: true }
	},{
		timestamps: true,
});

const certificatesModel = mongoose.models.certificates || mongoose.model("certificates", certificatesSchema);

export default certificatesModel