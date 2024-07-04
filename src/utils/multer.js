const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('file Multer:', file)
        const uploadPath = path.join(__dirname, '..', 'public', 'archives');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const uploader = multer({ storage })

module.exports = { uploader }; 

