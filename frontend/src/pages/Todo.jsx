import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHttpClient } from '../shared/hooks/http-hook';
import Modal from '../Modal';
import './Todo.css';



const Todo = (props) => {

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [update, setUpdate] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date('2020-11-03T21:11:54')
  );
  const [tagName,setTagName]=useState('');

  const [todoText, setTodoText] = useState('');

  const [items, setItems] = useState([]);

  const { sendRequest } = useHttpClient();

  const tagId = useParams().tagId;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleTextFieldChange(e) {
    setTodoText(e.target.value);
  }

  useEffect(() => {
    console.log('useeff');
    getItemList();
  }, [sendRequest,tagId]);

  const submit = async (event) => {
    handleClose();
    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/todo/item/${tagId}`,
      'POST',
      JSON.stringify({
        item: todoText,
        finishAt: selectedDate,
      }),
      {
        'Content-Type': 'application/json',
      }
    );
    if(responseData){
     setItems(responseData.items);
    }
  };

  const updateItem = async (event) => {
    event.preventDefault();

    handleClose();

    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/todo/item/${selectedItem._id}`,
      'PATCH',
      JSON.stringify({
        text: todoText,
        finishAt: selectedDate,
      }),
      {
        'Content-Type': 'application/json',
        //   Authorization: 'Bearer ' + auth.token
      }
    );

    // here I just update changed item in items!
    const filteredItem = items.filter(
      (item) => item._id === responseData.item._id
    )[0];
    const indexfind = items.findIndex((item) => item._id === filteredItem._id);
    items[indexfind] = responseData.item;

    setUpdate(false);
  };

  const getItemList = async (event) => {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/todo/${tagId}`
    );
     setItems(responseData.item);
     setTagName(responseData.tag);
  };
  function editTodo(item) {
    setTodoText(item.text);
    setSelectedItem(item);
    setUpdate(true);
    handleClickOpen();
  }

  return (
<div className="item-container">



  <h1>{tagName}</h1>
      <div>
        <AddCircleOutlineIcon onClick={handleClickOpen} />
        <Modal
          header={tagName}
          open={open}
          close={handleClose}
          footer={
            <>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={update ? updateItem : submit} color='primary'>
                Submit
              </Button>
            </>
          }
          content={
            <>
              {' '}
              <TextField
                value={todoText}
                onChange={handleTextFieldChange}
                autoFocus
                margin='dense'
                id='name'
                label='newTodo'
                type='text'
                fullWidth
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify='space-around'>
                  <KeyboardDatePicker
                    margin='normal'
                    id='date-picker-dialog'
                    label='Date picker dialog'
                    format='MM/dd/yyyy'
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </>
          }
        />
      </div>

      <List>
        {items &&
          items.map((item, index) => (
            <ListItem dense button key={index} >
              <ListItemIcon>
                <Checkbox edge='start' disableRipple />
              </ListItemIcon>
              <ListItemText primary={item.text} secondary={item.finishAt}  />
              <ListItemSecondaryAction>
                <IconButton
                  edge='end'
                  aria-label='comments'
                  onClick={() => editTodo(item)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton edge='end' aria-label='comments'>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
      </div>

  );
};



export default Todo;
