import express from 'express';
import authCtrl from '../controllers/auth.controller';
import testCtrl from '../controllers/test.controller';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/api/test/:userId').post(authCtrl.requireSignin, testCtrl.create);
router
  .route('/api/test/by/:userId')
  .get(authCtrl.requireSignin, testCtrl.listByUser);
router
  .route('/api/test/:testId')
  .delete(authCtrl.requireSignin, testCtrl.hasAuthorization, testCtrl.remove);

router.param('userId', userCtrl.userByID);
router.param('testId', testCtrl.testByID);

export default router;
