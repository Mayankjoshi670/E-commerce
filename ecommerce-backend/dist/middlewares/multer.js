import multer from "multer";
const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, "uploads");
    },
    filename(req, file, callback) {
        callback(null, file.originalname);
    }
});
export const singleUpload = multer({ storage }).single("photo");
