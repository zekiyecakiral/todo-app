import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import EventIcon from '@material-ui/icons/Event';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import {
  useTheme,
  Divider,
  Drawer,
  Hidden,
  Button,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import useStyles from './material-styles';

import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import Modal from '../Modal';
import './Sidebar.css';

function Sidebar(props, { defaultActive }) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [todoText, setTodoText] = useState('');
  const { sendRequest } = useHttpClient();

  const [tags, setTags] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
    console.log('useeff');
    getTagList();
  }, [sendRequest]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setTodoText('');
    setOpen(false);
  };

  function handleTextFieldChange(e) {
    setTodoText(e.target.value);
  }
  const getTagList = async (event) => {
    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/todo/tags/${auth.userId}`
    );
    setTags(responseData);
  };

  const submit = async (event) => {
    handleClose();
    const responseData = await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/todo/${auth.userId}`,
      'POST',
      JSON.stringify({
        tag: todoText,
      }),
      {
        'Content-Type': 'application/json',
        //   Authorization: 'Bearer ' + auth.token
      }
    );
    let result = responseData.todo;
    setTags([...tags, result]);
  };

  const drawer = (
    <div>
      <Modal
        header='create new tag'
        open={open}
        close={handleClose}
        footer={
          <>
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button onClick={submit} color='primary'>
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
          </>
        }
      />

      <div className={classes.toolbar} />
      <Divider />

      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <AddIcon onClick={handleClickOpen} />
          <Typography>TodoTag List</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Divider />
          <List>
            {tags &&
              tags.map((item, index) => (
                <ListItem button key={index}>
                  <Link
                    to={`/${item._id}`}
                    style={{ textDecoration: 'none', color: 'black' }}
                  >
                    <ListItemText className='sidebar-todo'>{item.tag}</ListItemText>
                  </Link>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                </ListItem>
              ))}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <nav className={classes.drawer} aria-label='mailbox folders'>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation='css'>
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant='permanent'
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default Sidebar;