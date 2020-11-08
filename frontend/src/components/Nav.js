import React, { useContext } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import {
  AppBar,
  CssBaseline,
  IconButton,
  Button,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AuthContext } from '../shared/context/auth-context';
import useStyles from './material-styles';

function Nav(props) {
  const auth = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    auth.logout();
  };
  return (
    <div>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar} >
        <Toolbar>
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
            TODO List
          </Typography>

          <Button color='inherit' onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav;
