import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Tags from './Tags';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import {
  useTheme,
  Divider,
  Drawer,
  Hidden,
  Button,
  TextField,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, CssBaseline, IconButton, Toolbar } from '@material-ui/core';

import useStyles from './material-styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { useHttpClient } from '../shared/hooks/http-hook';
import { AuthContext } from '../shared/context/auth-context';
import Modal from '../Modal';
import './MainNavigation.css';

function Sidebar(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [todoText, setTodoText] = useState('');
  const { sendRequest } = useHttpClient();
  const [tags, setTags] = useState();
  const auth = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    const getTagList = async (event) => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/todo/tags/${auth.userId}`
      );
      setTags(responseData);
    };
    getTagList();
  }, [sendRequest]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClose = () => {
    setTodoText('');
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  function handleTextFieldChange(e) {
    setTodoText(e.target.value);
  }

  const searchHandler =(e)=>{
    console.log('serarcy',e.target.value);
    setTags()

  }
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
      }
    );
    setTags([...tags, responseData.todo]);
  };

  const logout = () => {
    auth.logout();
    history.push('/auth');
  };
  const deleteTagHandler = async (deletedTagId) => {
    await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/todo/tags/${deletedTagId}`,
      'DELETE',
      null,
      {
        Authorization: 'Bearer ' + auth.token,
      }
    );

    setTags((prevTags) => prevTags.filter((tag) => tag._id !== deletedTagId));
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
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
          onChange={searchHandler}
        />
      </div>

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
          <Tags tags={tags} onDeleteTag={deleteTagHandler} />
        </AccordionDetails>
      </Accordion>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className='nav-todo'>
          <div className='header-logo'>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' noWrap>
              TODO LIST
            </Typography>
          </div>
          <Button color='inherit' onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
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
    </div>
  );
}

export default Sidebar;
