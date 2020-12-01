
const HttpError = require('../models/http-error');
const Todo = require('../models/todo');
const Item = require('../models/item');
const User = require('../models/user');
const mongoose = require("mongoose");

const getItemsByTagId = async (req, res, next) => {
  const todoId = req.params.id;
  // let places;
  let todos;
  try {
    todos = await Todo.findById(todoId).populate('item');
    console.log('todos', todos);
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(200).json(todos);
};

const getTagsByUserId = async (req, res, next) => {

  const userId = req.params.uId;
  let todos;
  try {
    todos = await Todo.find({ creator: userId });
    console.log('todos', todos);
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      500
    );
    return next(error);
  }

  res.status(200).json(todos);
};

const createTag = async (req, res, next) => {

  const { tag } = req.body;
  const userId = req.params.uId;

  let todo;
  try {
    todo = await Todo.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      500
    );
    return next(error);
  }


  if (todo && todo.length !== 0) {

    if(todo.filter(item => item.tag === tag).length>0){
      return next(
        new HttpError('The tag exists in db, please create again!', 404)
      );
    }
 
  }
   todo = new Todo({
    tag: tag,
    creator: userId,
  });

  try {
    todo= await todo.save();

  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not save tag.',
      500
    );
    return next(error);
  }


  res.status(200).json({ todo });
};

const createItemByTagId = async (req, res, next) => {

  const { item, finishAt } = req.body;
  const tagId = req.params.tagId;

  let todo;
  try {
    todo = await Todo.findById(tagId);
    console.log('todo', todo);
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      500
    );
    return next(error);
  }

  let todoItem = new Item({
    text: item,
    tag: todo.id,
    finishAt: finishAt,
    createdAt: Date.now(),
  });
  try {
    todoItem = await todoItem.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not save todo item.',
      500
    );
    return next(error);
  }

  todo.item.push(todoItem._id);

  try {
    todo = await todo.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not save notification.',
      500
    );
    return next(error);
  }

  todo.populate('item', function (err) {
    res.status(200).json({ items: todo.item.toObject({ getters: true }) });
  });
};

const updateItemById = async (req, res, next) => {
  const { text, finishAt ,isChecked} = req.body;
  const itemId = req.params.itemId;

  let item;
  try {
    item = await Item.findById(itemId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update item.',
      500
    );
    return next(error);
  }


  item.isChecked=isChecked;
  console.log('isChecked',isChecked);
  console.log('text',text.length) ;
  console.log('finishAt',finishAt)


  if(text && text.length !== 0){
    item.finishAt = finishAt;
    item.text = text;
  
    console.log('icinde')
  }

  try {
    await item.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update item.',
      500
    );
    return next(error);
  }

  res.status(200).json({ item });
};

const deleteItemById = async (req, res, next) => {
  const itemId = req.params.itemId;

console.log('sidlcem',itemId);

  let item;
  try {
    item = await Item.findById(itemId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete item.",
      500
    );
    return next(error);
  }

  if (!item) {
    const error = new HttpError("Could not find item for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await item.remove({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not delete item.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted item." });
};
const deleteTagById = async (req, res, next) => {
  const tagId = req.params.tagId;

console.log('sidlcem',tagId);

  let tag;
  try {
    tag = await Todo.findById(tagId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not delete tag.",
      500
    );
    return next(error);
  }

  if (!tag) {
    const error = new HttpError("Could not find tag for this id.", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await tag.remove({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Something went wrong, could not delete tag.",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Deleted tag." });
};

exports.getItemsByTagId = getItemsByTagId;
exports.getTagsByUserId = getTagsByUserId;
exports.createItemByTagId = createItemByTagId;
exports.createTag = createTag;
exports.updateItemById = updateItemById;
exports.deleteItemById = deleteItemById;
 exports.deleteTagById = deleteTagById;