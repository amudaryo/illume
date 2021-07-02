import Test from '../models/test.model';
import errorHandler from './../helpers/dbErrorHandler';
import formidable from 'formidable';

// const create = async (req, res) => {
//   console.log(req.body);
//   try {
//     req.body.createdBy = req.auth._id;
//     const test = new Test(req.body);
//     await test.save();
//     return res.status(200).json({
//       message: 'test created!',
//     });
//   } catch (err) {
//     return res.status(400).json({
//       error: errorHandler.getErrorMessage(err),
//     });
//   }
// };

const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    let test = new Test(fields);
    test.createdBy = req.profile;
    try {
      let result = await test.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const testByID = async (req, res, next, id) => {
  try {
    let test = await Test.findById(id).populate('createdBy', '_id name').exec();
    if (!test)
      return res.status('400').json({
        error: 'Test not found',
      });
    req.test = test;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve test',
    });
  }
};

const remove = async (req, res) => {
  let test = req.test;
  try {
    let deletedTest = await test.remove();
    res.json(deletedTest);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const hasAuthorization = (req, res, next) => {
  let hasAuthorization =
    req.test && req.auth && req.test.createdBy._id == req.auth._id;
  if (!hasAuthorization) {
    return res.status('403').json({
      error: 'User is not authorized',
    });
  }
  next();
};

const listByUser = async (req, res) => {
  console.log(req.params);
  try {
    let tests = await Test.find({ createdBy: req.params.userId })
      .populate('createdBy', '_id name')
      .sort('-created')
      .exec();
    res.json(tests);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

export default {
  create,
  remove,
  hasAuthorization,
  listByUser,
  testByID,
};
