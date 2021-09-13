const path = require('path');
const S3 = require('aws-sdk/clients/s3');
const uuid = require('uuid').v1;

const {
    variables: {
        AMAZON_PATH,
        AWS_S3_ACCESS_KEY,
        AWS_S3_NAME,
        AWS_S3_REGION,
        AWS_S3_SECRET_KEY,
    }
} = require('../config');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_S3_ACCESS_KEY,
    secretAccessKey: AWS_S3_SECRET_KEY
});

function _fileNameCreator(fileName, itemType, itemId) {
    const fileTypeExtension = path.extname(fileName);
    return path.posix.join(itemType, itemId, `${uuid()}${fileTypeExtension}`);
}

module.exports = {
    uploadFile: (file, itemType, itemId) => {
        const { data, mimetype, name } = file;

        const fileName = _fileNameCreator(name, itemType, itemId);

        return bucket.upload({
            Bucket: AWS_S3_NAME,
            Body: data,
            Key: fileName,
            ContentType: mimetype
        })
            .promise();
    },

    deleteFile: (bucket_path) => {
        const path_part = bucket_path.split(AMAZON_PATH)[1];
        return bucket.deleteObject({
            Bucket: AWS_S3_NAME,
            Key: path_part,
        }).promise();
    }
};
