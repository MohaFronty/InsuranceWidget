import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Avatar,
  Box,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications,
  Search,
  Settings,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleSidebar, toggleTheme } from '../store/slices/uiSlice';

interface HeaderProps {
  sidebarWidth: number;
}

const Header: React.FC<HeaderProps> = ({ sidebarWidth }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { sidebarOpen, theme: currentTheme } = useAppSelector((state) => state.ui);
  const { user } = useAppSelector((state) => state.auth);

  const handleMenuToggle = () => {
    dispatch(toggleSidebar());
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { sm: sidebarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%' },
        ml: { sm: sidebarOpen ? `${sidebarWidth}px` : 0 },
        backgroundColor: theme.palette.background.paper,
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar sx={{ minHeight: '64px !important' }}>
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          edge="start"
          onClick={handleMenuToggle}
          sx={{ 
            mr: 2,
            color: theme.palette.text.primary,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ 
            flexGrow: 1,
            color: theme.palette.text.primary,
            fontWeight: 600,
          }}
        >
          Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size="large"
            aria-label="search"
            sx={{ color: theme.palette.text.primary }}
          >
            <Search />
          </IconButton>

          <IconButton
            size="large"
            aria-label="toggle theme"
            onClick={handleThemeToggle}
            sx={{ color: theme.palette.text.primary }}
          >
            {currentTheme === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          <IconButton
            size="large"
            aria-label="show notifications"
            sx={{ color: theme.palette.text.primary }}
          >
            <Badge badgeContent={4} color="primary">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton
            size="large"
            aria-label="settings"
            sx={{ color: theme.palette.text.primary }}
          >
            <Settings />
          </IconButton>

          <Avatar
            src={user?.avatar}
            alt={user?.name}
            sx={{
              width: 40,
              height: 40,
              ml: 1,
              bgcolor: theme.palette.primary.main,
            }}
          >
            {user?.name?.charAt(0) || 'U'}
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
