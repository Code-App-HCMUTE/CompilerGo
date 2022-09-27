import express from 'express';
import { CompileController } from '../../controllers/compile.controller';
const router = express.Router();

router.route('/python').post(CompileController.pythonCompile);
router.route('/cPlus').post(CompileController.cPlusCompile);
router.route('/java').post(CompileController.javaCompile);

export const CompileRoutes = router;