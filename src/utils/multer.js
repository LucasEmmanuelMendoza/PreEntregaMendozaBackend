/* const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const carpeta = document.getElementById('archivo')

        const folder = `/public/archives/${carpeta}`

        cb(null, path.join(__dirname, folder));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
})

const uploader = multer({storage})

module.exports = { uploader } */

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb) =>{
        const archiveType = req.body.archiveType
        let folder = '';

        console.log('req.body:', req.body)
        console.log('req.body:', archiveType)

        console.log('archiveType: ', archiveType)
        if(archiveType === 'documents'){
            folder = 'documents';
        }else if(archiveType === 'products'){
            folder = 'products';
        }else if(archiveType === 'profiles'){
            folder = 'profiles';
        }

        console.log('folder:', folder)
        const uploadPath = path.join(__dirname, '..', 'public', 'archives', folder);
        console.log('uploadPath:', uploadPath)
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

//const uploader = multer({ storage });
const uploader = multer({ storage })

module.exports = { uploader };