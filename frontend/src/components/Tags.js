import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import { List, ListItem, ListItemIcon, ListItemText,Button,Typography } from '@material-ui/core';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';

const Tags = (props) => {
  const [deletedTag,setDeletedTag]=useState();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const deleteTag = async (event,tag) => {
    event.preventDefault();
    handleClickOpen();
    setDeletedTag(tag);
    props.onDeleteTag(tag._id);
 
  };

  return (
      <>
  
    <List>
      {props.tags &&
        props.tags.map((item, index) => (
          <ListItem button key={index}>
            <Link
              to={`/${item._id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ListItemText className='sidebar-todo'>{item.tag}</ListItemText>
            </Link>
            <ListItemIcon onClick={e=>deleteTag(e,item)}>
              <DeleteIcon />
            </ListItemIcon>
          </ListItem>
        ))}
    </List>
    </>
  );
};

export default Tags;
