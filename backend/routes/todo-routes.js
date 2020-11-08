const express = require('express');

const todoControllers = require('../controllers/todo-controllers');

const router = express.Router();


router.get('/:id',todoControllers.getItemsByTagId);
router.get('/tags/:uId',todoControllers.getTagsByUserId);

router.post('/item/:tagId', todoControllers.createItemByTagId);
router.post('/:uId', todoControllers.createTag);

router.patch('/item/:itemId',todoControllers.updateItemById);

module.exports = router;