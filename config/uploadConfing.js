const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },

  filename: function (req, file, callback) {
    const unique =
      "file-" + Date.now() + "-" + file.originalname.replace(/\s+/g, "-");

    callback(null, unique);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;