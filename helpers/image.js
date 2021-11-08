import S3 from "aws-sdk/clients/s3";

import fs from "fs";
import util from "util";
const unlinkFile = util.promisify(fs.unlink);

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
	endpoint: "cdn.cream.glass",
	s3BucketEndpoint: true,
	region,
	accessKeyId,
	secretAccessKey,
});

module.exports = {
	upload: async (req, res) => {
		const uploadFile = async (file) => {
			const fileStream = fs.createReadStream(file.path);

			const uploadParams = {
				Bucket: bucketName,
				Body: fileStream,
				Key: file.filename,
			};

			return s3.upload(uploadParams).promise();
		};
		const file = req.file;
		const result = await uploadFile(file);

		await unlinkFile(file.path);

		return res.status(200).send({ key: result.Key });
	},
	get: async (fileKey) => {
		const getParams = {
			Key: fileKey,
			Bucket: bucketName,
			Expires: 60,
		};

		return s3.getSignedUrl("getObject", getParams);
	},
	delete: async (Key) => {
		const deleteParams = {
			Key,
			Bucket: bucketName,
		};
		return s3.deleteObject(deleteParams, (err, result) => {
			console.log(err, result);
		});
	},
};
