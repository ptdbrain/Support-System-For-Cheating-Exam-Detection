import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import {
  MeetingRoom as RoomIcon,
  Videocam as CamIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const DRAWER_WIDTH = 240;
const MINI_DRAWER_WIDTH = 72;

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'rooms',
    label: 'Rooms',
    icon: <RoomIcon />,
    path: '/'
  },
  {
    id: 'cameras',
    label: 'Cameras',
    icon: <CamIcon />,
    path: '/cameras'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <SettingsIcon />,
    path: '/settings'
  }
];

function Sidebar(): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  const [isMiniMode, setIsMiniMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    if (isMiniMode) {
      setIsMiniMode(false);
      setIsOpen(true);
    } else {
      setIsMiniMode(!isOpen);
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const drawerWidth = isMiniMode ? MINI_DRAWER_WIDTH : DRAWER_WIDTH;

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
       <Box
         sx={{
           p: 2,
           display: 'flex',
           alignItems: 'center',
           justifyContent: isMiniMode ? 'center' : 'space-between',
           background: '#0B1D51',
           color: 'white',
           minHeight: 64
         }}
       >
         {!isMiniMode && (
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
             <img 
               src="https://soict.hust.edu.vn/wp-content/uploads/logo-soict-hust-1-2.png" 
               alt="SOICT Logo" 
               style={{ 
                 height: '40px', 
                 width: 'auto',
                 objectFit: 'contain'
               }} 
             />
           </Box>
         )}
         <IconButton
           onClick={handleToggle}
           sx={{ color: 'white' }}
           size="small"
         >
           {isMiniMode ? <MenuIcon /> : <CloseIcon />}
         </IconButton>
       </Box>

      <Divider />

      {/* Navigation Items */}
      <List sx={{ flex: 1, px: 1, py: 2 }}>
        {sidebarItems.map((item) => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <Tooltip title={isMiniMode ? item.label : ''} placement="right">
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: 0,
                  minHeight: 48,
                  justifyContent: isMiniMode ? 'center' : 'flex-start',
                  px: isMiniMode ? 2 : 3,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'white',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'primary.light',
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: isMiniMode ? 0 : 3,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isMiniMode && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.95rem',
                      fontWeight: 500,
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      {/* Footer - System Status */}
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        {!isMiniMode ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#10b981',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.5 }
                }
              }}
            />
            <Typography variant="body2" color="text.secondary">
              System Active
            </Typography>
          </Box>
        ) : (
          <Tooltip title="System Active" placement="right">
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#10b981',
                margin: '0 auto',
                animation: 'pulse 2s infinite',
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.5 }
                }
              }}
            />
          </Tooltip>
        )}
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}

export default Sidebar;
