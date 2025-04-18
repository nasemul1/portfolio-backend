import multer from 'multer';

const storage = multer.memoryStorage(); // stores file in memory

const upload = multer({ storage });

export default upload;
