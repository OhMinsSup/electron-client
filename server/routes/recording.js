const { Router } = require('express');
const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary');

const authorized = require('../middlewares/authorized');
const File = require('../model/File');

const {
  CLOUDINARY_API_SECRET,
  CLOUDINARY_APIKEY,
  CLOUDINARY_CLOUD_NAME,
} = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_APIKEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const recording = Router();

recording.get('/', authorized, async (req, res) => {
  const file = await File.findAndCountAll({
    where: {
      isDeleted: false,
    },
  });

  res.status(200).json({
    ok: true,
    error: null,
    file,
  });
});

recording.delete('/:fileId', authorized, async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findOne({
      id: fileId,
    });

    if (!file) {
      res.status(404).json({
        ok: false,
        error: 'Error: File Data is NotFound',
      });
      return;
    }

    await file.update({
      isDeleted: true,
    });

    res.status(200).json({
      ok: true,
      error: null,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  }
});

recording.post('/upload', authorized, async (req, res) => {
  const { file } = req.files;

  if (!file) {
    res.status(400).json({
      ok: false,
      error: 'Error: File Data is NotFound',
      url: null,
      path: null,
      name: null,
    });
    return;
  }

  try {
    const stats = fs.statSync(file.tempFilePath);

    if (!stats) {
      res.status(500).json({
        ok: false,
        error: 'Error: Fail to Load Stats',
        url: null,
        path: null,
        name: null,
      });
      return;
    }

    const userId = req.session.user.id;
    const filename = file.name.split('.')[0];

    const zoomFile = await File.create({
      userId,
      filename,
      mimeType: file.mimetype,
    });

    const public_id = `zoom/${userId}/${zoomFile.id}/${filename}`;

    const response = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      resource_type: 'video',
      chunk_size: 6000000,
      public_id,
    });

    await zoomFile.update({
      publicId: public_id,
      url: response.secure_url,
    });

    res.status(200).json({
      ok: true,
      error: null,
      publicId: public_id,
      url: response.secure_url,
      name: filename,
    });
  } catch (e) {
    console.error(e);
    res.status(e.response.status).json({
      ok: false,
      error: 'Error: 4000: Data is NotFound',
    });
  } finally {
    const p = path.join(__dirname, `../../${file.tempFilePath}`);
    fs.unlink(p, (err) => {
      if (err) {
        console.err(err);
      }
    });
  }
});

recording.delete('/', (req, res) => {
  res.status(200).json({
    ok: true,
    error: null,
  });
});

module.exports = recording;
