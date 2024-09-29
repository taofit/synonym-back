import express from 'express';
import controller from '../controllers/synonym';

const router = express.Router();

router.post('/', controller.createSynonym);
router.put('/', controller.updateSynonym);
router.get('/all/word', controller.getAllSynonyms);
router.get('/:word', controller.getSynonyms);

export default router;
