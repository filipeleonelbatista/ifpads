import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote';
import { Avatar, ListItemButton, ListItemIcon, ListItemText, Tooltip, useMediaQuery } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DefaultLogo from '../assets/logo.png';
import { useAuth } from '../hooks/useAuth';
import PadsListMenu from './PadsListMenu';

import Logout from '@mui/icons-material/Logout';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://desenvolvedordeaplicativos.com.br">
        Desenvolvedor de Aplicativos
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#566DEA',
      dark: '#3c4ca3',
      light: '#778aee',
      contrastText: "#FFF"
    },
    secondary: {
      main: '#e0e0e0',
      dark: '#9c9c9c',
      light: '#e9e9e9',
      contrastText: "#161616"
    },
    twitch: {
      main: '#6441a5',
      dark: '#462d73',
      light: '#927AC0',
      contrastText: "#FFF"
    }
  }
});

const mdThemeDark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#566DEA',
      dark: '#3c4ca3',
      light: '#778aee',
      contrastText: "#FFF"
    },
    secondary: {
      main: '#e0e0e0',
      dark: '#9c9c9c',
      light: '#e9e9e9',
      contrastText: "#161616"
    },
    twitch: {
      main: '#6441a5',
      dark: '#462d73',
      light: '#927AC0',
      contrastText: "#FFF"
    }
  }
});

function DrawerComponent({ title, children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { isLogged, user, handleLogout } = useAuth();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = React.useState("dark");
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {

    console.log("ANALITYCS", "click", {
      link_id: `menu-${!open ? 'aberto' : 'fechado'}`,
    })
    window.gtag('event', 'click', {
      link_id: `menu-${!open ? 'aberto' : 'fechado'}`,
    })

    setOpen(!open);
  };

  React.useEffect(() => {
    if (localStorage.getItem("@dark-theme") !== null) {
      const selectedTheme = localStorage.getItem("@dark-theme")
      setMode(selectedTheme)
    } else {
      localStorage.setItem("@dark-theme", prefersDarkMode ? 'dark' : 'light')
      setMode(prefersDarkMode ? 'dark' : 'light')
    }
  }, [])

  React.useEffect(() => {
    console.log("Ambiente", process.env.NODE_ENV)
    if (process.env.NODE_ENV !== 'development') {
      const handleContextmenu = e => {
        e.preventDefault()
      }
      document.addEventListener('contextmenu', handleContextmenu)

      document.onkeydown = function (e) {

        alert("Olha a audácia desse FDP! quer saber sobre o codigo, chama filipeleonelbatista na Twitch")
        // disable F12 key
        if (e.keyCode == 123) {
          return false;
        }

        // disable I key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
          return false;
        }

        // disable J key
        if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
          return false;
        }

        // disable U key
        if (e.ctrlKey && e.keyCode == 85) {
          return false;
        }
      }

      return function cleanup() {
        document.removeEventListener('contextmenu', handleContextmenu)
      }
    }
  }, [])

  return (
    <ThemeProvider theme={mode === 'light' ? mdTheme : mdThemeDark}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Tooltip title="Expandir Menu">
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              {title}
            </Typography>
            <Tooltip title="Definir Modo Escuro/Claro">
              <IconButton sx={{ ml: 1 }} onClick={() => {

                console.log("ANALITYCS", "click", {
                  link_id: `${mode === "dark" ? 'light' : 'dark'}-theme`,
                })
                window.gtag('event', 'click', {
                  link_id: `${mode === "dark" ? 'light' : 'dark'}-theme`,
                })

                setMode(mode === "dark" ? 'light' : 'dark')
                localStorage.setItem("@dark-theme", mode === "dark" ? 'light' : 'dark')
              }} color="inherit">
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Tooltip>
            {
              isLogged && (
                <Tooltip title={user.login} sx={{ ml: 2 }}>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'user-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar src={user.profile_image_url} alt={user.login} />
                  </IconButton>
                </Tooltip>
              )
            }
          </Toolbar>
          {isLogged && (
            <Menu
              anchorEl={anchorEl}
              id="user-menu"
              open={openMenu}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem component="button" onClick={handleLogout}>
                <ListItemIcon >
                  <Logout fontSize="small" />
                </ListItemIcon>
                Sair
              </MenuItem>
            </Menu>
          )}
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: "flex-start", width: "100%", pl: 2 }}>
              <Avatar alt='Avatar' src={DefaultLogo} sx={{ width: 24, height: 24 }} />
              <Typography>
                IF Pads
              </Typography>
            </Box>
            <Tooltip title="Recolher Menu">
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
          <Divider />
          <List component="nav" sx={{ height: 'calc(100vh - 64px)', overflowY: 'auto', overflowX: 'hidden' }}>
            {
              isLogged && (
                <>
                  <Tooltip placement="right" title="Controle remoto">
                    <ListItemButton selected={location.pathname === "/controle-remoto"} onClick={() => navigate("/controle-remoto")}>
                      <ListItemIcon>
                        <SettingsRemoteIcon />
                      </ListItemIcon>
                      <ListItemText primary="Controle remoto" />
                    </ListItemButton>
                  </Tooltip>
                  <Divider sx={{ my: 1 }} />
                </>
              )
            }
            <PadsListMenu />
            <Divider sx={{ my: 1 }} />
            <Tooltip placement="right" title="Configurações">
              <ListItemButton selected={location.pathname === "/configuracoes"} onClick={() => navigate("/configuracoes")}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configurações" />
              </ListItemButton>
            </Tooltip>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 1, mb: 1 }}>
            {children}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DrawerComponent;