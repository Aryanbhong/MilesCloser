const cloudinary = require("cloudinary").v2;

const uploadImageToCloudinary = async (localFilePath, folder = "milesCloserData", height = null, quality = null) => {
  if (!localFilePath) {
    throw new Error("Missing local file path for Cloudinary upload");
  }

  const options = {
    folder,
    use_filename: true,
    resource_type: "image",
  };

  if (height) options.height = height;
  if (quality) options.quality = quality;

  return cloudinary.uploader.upload(localFilePath, options); // ✅ Must be a valid path string
};

module.exports = uploadImageToCloudinary;
