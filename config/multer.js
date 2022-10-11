const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
aws.config.loadFromPath(__dirname + "/awsconfig.json");
const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "sonb-test-bucket",
        acl: "public-read",
        key: function (req, file, cb) {
            cb(null, Math.floor(Math.random() * 1000).toString() + Date.now() + "." + file.originalname.split(".").pop());
            // Math.random() * 1000).toString() + Date.now() -> 랜덤숫자, file.originalname.split(".").pop() -> PNG
            // 결과값 : 랜덤숫자.PNG
        },
        // key 속성 : 업로드하는 파일이 어떤 이름으로 버킷에 저장되는가에 대한 속성
    }),
    limits: {
        fileSize: 10 * 1024 * 1000, // 10M 파일 크기 제한
    },
});

module.exports = upload;
