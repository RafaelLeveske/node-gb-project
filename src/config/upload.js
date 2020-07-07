const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

module.exports = {
  directory: path.resolve(__dirname, '..', '..', 'tmp'),

  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'tmp'),
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
