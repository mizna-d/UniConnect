const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'uniconncet', 
    api_key: '992137314179718', 
    api_secret: 'TQFheUbNT1heG26hljTQqh07ffo' 
  });

module.exports = cloudinary;