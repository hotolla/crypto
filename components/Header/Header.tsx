import { useState, useEffect } from 'react';
import * as React from 'react';
import Link from 'next/link';
import {
  Typography,
  IconButton,
  Container,
  Toolbar,
  Menu,
  Tooltip,
  MenuItem,
  Switch,
  Box,
  Button,
  AppBar
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import LoginIcon from '@mui/icons-material/Login';
import { useAuth } from '@/components/AuthProvider';

const pages = [ 'markets', 'dashboard', 'help' ];
const settings = [ 'dashboard', 'login' ];

interface IProps {
  isDarkTheme: boolean,
  onThemeToggle: () => void,
}

export const Header = ({ isDarkTheme, onThemeToggle }: IProps) => {
  const [ anchorElUser, setAnchorElUser ] = React.useState<null | HTMLElement>(null);
  const { isAuthenticated, user, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{display: 'flex', justifyContent: 'center'}}>
          <CurrencyBitcoinIcon sx={{display: { xs: 'none', md: 'flex' }, mr: 1 }}/>

          <Link href="/markets" passHref legacyBehavior>
            <Typography variant="h5" align="center" mr={6} style={{ cursor: 'pointer' }}>
              Crypto exchange
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            {pages.map((page) => (
              <Link  key={page} href={`/${page}`} passHref legacyBehavior>
                <Typography variant="button" align="center" mr={5} style={{ cursor: 'pointer' }}>
                  {page}
                </Typography>
              </Link>
            ))}
          </Box>

          <Tooltip title={user?.name}>
            <IconButton color="inherit" onClick={handleOpenUserMenu}>
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>

          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseUserMenu}>

                <Link  key={setting} href={`/${setting}`} passHref legacyBehavior>
                  <Typography variant="h6" align="center" mr={5} style={{ cursor: 'pointer' }}>
                    {setting}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>

          <Switch checked={isDarkTheme} onChange={onThemeToggle} />

          {isClient && isAuthenticated ? (
            <Link href="/login" passHref legacyBehavior>
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
                onClick={logout}
              >
                Logout
              </Button>
            </Link>
          ) : (
            <Link href="/login" passHref legacyBehavior>
              <Button
                color="inherit"
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};