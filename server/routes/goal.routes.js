import express from 'express';
import authCtrl from '../controllers/auth.controller';
import goalCtrl from '../controllers/goal.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/goal/:userId').post(authCtrl.requireSignin, goalCtrl.create);
router
  .route('/api/goal/by/:userId')
  .get(authCtrl.requireSignin, goalCtrl.listByUser);
router
  .route('/api/goal/:goalId')
  .delete(authCtrl.requireSignin, goalCtrl.hasAuthorization, goalCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('goalId', goalCtrl.goalByID);

export default router;
