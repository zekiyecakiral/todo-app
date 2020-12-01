const express = require('express');

const todoControllers = require('../controllers/todo-controllers');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();


router.get('/:id',todoControllers.getItemsByTagId);
router.get('/tags/:uId',todoControllers.getTagsByUserId);

router.post('/item/:tagId', todoControllers.createItemByTagId);
router.post('/:uId', todoControllers.createTag);

router.patch('/item/:itemId',todoControllers.updateItemById);

router.use(checkAuth);

router.delete('/item/:itemId', todoControllers.deleteItemById );

 router.delete('/tags/:tagId', todoControllers.deleteTagById );

module.exports = router;