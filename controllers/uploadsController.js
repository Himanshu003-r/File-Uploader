const path = require("path");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;

// File storage via server or local storage

const uploadProductImageLocal = async (req, res) => {
    // check if file exists
    // check format
    // check size
    if (!req.files) {
        throw new CustomError.BadRequest("No File Uploaded");
    }
    const productImage = req.files.image;

    if (!productImage.mimetype.startsWith("image/jpg")) {
        throw new CustomError.BadRequest("Please Upload Image");
    }

    const maxSize = 1024 * 1024;

    if (productImage.size > maxSize) {
        throw new CustomError.BadRequest("Please Upload Image smaller then 1KB");
    }
    const imagePath = path.join(
        __dirname,
        "../public/uploads/" + `${productImage.name}`
    );
    await productImage.mv(imagePath);
    return res
        .status(200)
        .json({ image: { src: `/uploads/${productImage.name}` } });
};

// File storage via cloud

const uploadProductImage = async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: 'Upload_images'
        }
    );
    return res.status(200).json({ image: { src: result.secure_url } })

};
module.exports = {
    uploadProductImage,
};

