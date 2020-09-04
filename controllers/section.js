const Section = require('../models/section_model');
const distrct = require('../models/districts_model')
var cloudinary = require('cloudinary');
const path = require('path');
const fs = require('fs')
cloudinary.config({ 
  cloud_name: 'dsmjfk0ca', 
  api_key: '946235755834354', 
  api_secret: 'EKkHoklnM5REpKyhTBc6qO2Af08' 
});
exports.postSection = (req, res, next) => {
    const section = new Section(req.body);
    section.save((err) => {
        if (err) { return next(err); }
          if (err) {
            return next(err);
          }
          res.send({message:'Added Successfully', status: 'success'});
      });
}

exports.editSection = (req, res, next) => {
  console.log('edit section api');
  console.log(req.body);
  let id = req && req.query && req.query.id;
  Section
    .findOneAndUpdate({_id: id}, req.body)
    .exec((err, section) => {
      if (err) { return next(err); }
      res.send({data:section})
    });
}

exports.deleteSection = (req, res, next) => {
  const _id = req && req.query && req.query.id;
  Section
    .findByIdAndRemove({_id: _id})
    .exec((err, section) => {
      if (err) { return next(err); }
      res.send({status:'success'})
    });
}

exports.reviewSection = (req, res, next) => {
  toUpdate = {reviewComment:req.query.reviewComment, reviewBy: req.query.reviewBy}
  id = req.query.id
  Section
    .findOneAndUpdate({_id: id}, {$set: toUpdate})
    .exec((err, section) => {
      if (err) { return next(err); }
      res.send({data:section})
    });
}

exports.getSectionByFilter = (req, res, next) => {
    filterObj = {}
    if(req && req.query && req.query.createdBy !== 'undefined') {
      filterObj['createdBy'] = req && req.query && req.query.createdBy;
    }
    filterObj['type'] = req && req.query && req.query.type;
    if(req && req.query && req.query.month !== 'null') {
      filterObj['month'] = req.query.month
    }
    console.log(req.query);
    if(req && req.query && req.query.year !== 'null') {
      filterObj['year'] = req.query.year
    }

  Section
  .find(filterObj)
  .exec((err, section) => {
    if (err) { return next(err); }
    res.send({data:section})
  });

  // let result = Section.find({type: type, createdBy: createdBy}).limit(5).sort({_id:-1})
  //  res.status(200).json(result);
}



exports.getSection = (req, res, next) => {
  
  let type = req && req.query && req.query.type;
  let createdBy = req && req.query && req.query.createdBy;
  let limit = req && req.query && req.query.limit;
  if(createdBy) {
    if(Number(limit) === 0) {
      Section
      .find({type:type, createdBy: createdBy}).sort({_id:-1})
      .exec((err, section) => {
        if (err) { return next(err); }
        res.send({data:section})
      });
    } else {
      Section
      .find({type:type, createdBy: createdBy}).limit(Number(limit)).sort({_id:-1})
      .exec((err, section) => {
        if (err) { return next(err); }
        res.send({data:section})
      });
    }
  } else {
    if(Number(limit) === 0) {
      Section
      .find({type:type}).sort({_id:-1})
      .exec((err, section) => {
        if (err) { return next(err); }
        res.send({data:section})
      });
    } else {
      Section
      .find({type:type}).limit(Number(limit)).sort({_id:-1})
      .exec((err, section) => {
        if (err) { return next(err); }
        res.send({data:section})
      });
    }
  }

  // let result = Section.find({type: type, createdBy: createdBy}).limit(5).sort({_id:-1})
  //  res.status(200).json(result);
}

exports.uploadFile = (req, res, next) => {
        console.log(req.files.file);
        writeFile(req.files.file, res, req)
      }
      function writeFile(file, res, req) {
        var appDir = path.dirname(require.main.filename);
        console.log(appDir);
        
        const fileName = file && file.name || 'no_name.xlsx'
        const buffer = file && file.data
        let writeStream = fs.createWriteStream(fileName);
        writeStream.write(buffer, 'base64');
        var fileToUpload = path.dirname(fileName);
        writeStream.on('finish', () => {
        console.log(' Downloaded Successfully');
      
        }); 
        writeStream.end();
        cloudinary.v2.uploader.upload(appDir + '/' + fileName, 
        {resource_type: "raw",
        overwrite: true},
        function(error, result) {
            console.log(result);
            fs.unlinkSync(appDir+ '/' + fileName)
            res.status(200).json(result);
        });
    
}


exports.districts = (req, res, next) => {
  distrct
    .find({}, {district: 1})
    .exec((err, district) => {
      if (err) { return next(err); }
      res.send({data:district})
    });
}