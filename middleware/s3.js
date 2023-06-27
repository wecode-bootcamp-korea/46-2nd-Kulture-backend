const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	region: process.env.AWS_REGION,
});

const fileUpload = multer({
	storage: multerS3({
      s3:s3,
      bucket: process.env.BUCKET,
      acl:"public-read",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: function(req, file, cb) {
        const uniqueFilename = uuidv4();
        const filePath = `project/${uniqueFilename}`;
      cb(null, filePath);
    }
  })
});

module.exports = {
  fileUpload,
};