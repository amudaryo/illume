import Goal from '../models/goal.model';
import errorHandler from './../helpers/dbErrorHandler';
import formidable from 'formidable';

const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    let goal = new Goal(fields);
    goal.createdBy = req.profile;
    try {
      let result = await goal.save();
      res.json(result);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  });
};

const goalByID = async (req, res, next, id) => {
  try {
    let goal = await Goal.findById(id).populate('createdBy', '_id name').exec();
    if (!goal)
      return res.status('400').json({
        error: 'Goal not found',
      });
    req.goal = goal;
    next();
  } catch (err) {
    return res.status('400').json({
      error: 'Could not retrieve goal',
    });
  }
};

const remove = async (req, res) => {
  let goal = req.goal;
  try {
    let deletedGoal = await goal.remove();
    res.json(deletedGoal);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};

const hasAuthorization = (req, res, next) => {
  let hasAuthorization =
    req.goal && req.auth && req.goal.createdBy._id == req.auth._id;
  if (!hasAuthorization) {
    return res.status('403').json({
      error: 'User is not authorized',
    });
  }
  next();
};

const listByUser = async (req, res) => {
  try {
    let goals = await Goal.find({ createdBy: req.params.userId })
      .populate('createdBy', '_id name')
      .sort('-created')
      .exec();
    res.json(goals);
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
  goalByID,
};
