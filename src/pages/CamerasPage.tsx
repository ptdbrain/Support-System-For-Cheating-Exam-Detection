import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper,
  Fade,
  Pagination,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Avatar,
  Checkbox,
  Divider,
  Chip
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Check as CheckIcon,
  Videocam as VideocamIcon,
  ChevronRight as ChevronRightIcon,
  Circle as CircleIcon
} from '@mui/icons-material';
import { RoomWithCameras } from '../types/index';
import { getRoomsWithCameras } from '../data/mockData';
import AddCameraWithRoomModal from '../components/common/AddCameraWithRoomModal';

interface ExtendedCamera {
  id: number;
  name: string;
  roomId: number;
  roomName: string;
  displayName: string;
  status: 'Online' | 'Offline' | 'Recording' | 'Error';
  streamUrl?: string;
  note?: string;
}

function CamerasPage(): JSX.Element {
  const [rooms, setRooms] = useState<RoomWithCameras[]>(getRoomsWithCameras());
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedCameras, setSelectedCameras] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const camerasPerPage = 8;
  
  // Flatten all cameras from all rooms with room context
  const allCameras: ExtendedCamera[] = rooms.flatMap(room => 
    room.cameras.map(camera => ({
      id: camera.id,
      name: camera.name,
      roomId: room.id,
      roomName: room.name,
      displayName: `${room.name} - ${camera.name}`,
      status: camera.status,
      streamUrl: camera.streamUrl,
      note: camera.note
    }))
  );
  
  const totalPages = Math.ceil(allCameras.length / camerasPerPage);
  
  // Calculate cameras for current page
  const startIndex = (currentPage - 1) * camerasPerPage;
  const endIndex = startIndex + camerasPerPage;
  const currentCameras = allCameras.slice(startIndex, endIndex);

  const handleCameraClick = (camera: ExtendedCamera): void => {
    if (isDeleteMode) {
      setSelectedCameras(prev => 
        prev.includes(camera.id) 
          ? prev.filter(id => id !== camera.id)
          : [...prev, camera.id]
      );
    } else {
      navigate(`/room/${camera.roomId}/camera/${camera.id}`);
    }
  };

  const handleDeleteCameras = (): void => {
    if (selectedCameras.length > 0) {
      if (confirm(`Are you sure you want to delete ${selectedCameras.length} camera(s)?`)) {
        // Update rooms by removing selected cameras
        setRooms(prevRooms => 
          prevRooms.map(room => ({
            ...room,
            cameras: room.cameras.filter(camera => !selectedCameras.includes(camera.id))
          }))
        );
        
        setSelectedCameras([]);
        setIsDeleteMode(false);
      }
    }
  };

  const handleToggleDeleteMode = (): void => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedCameras([]);
  };

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
    // Clear selections when changing pages
    setSelectedCameras([]);
  };
  
  const handleAddCamera = (): void => {
    setIsAddModalOpen(true);
  };

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3, md: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'flex-start', 
        gap: { xs: 1, sm: 2 }, 
        mb: { xs: 2, sm: 3 }, 
        flexWrap: 'wrap' 
      }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCamera}
          sx={{
            backgroundColor: '#8CCDEB',
            color: '#0B1D51',
            '&:hover': {
              backgroundColor: '#5a9fd4',
            },
            fontWeight: 600,
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            py: { xs: 1, sm: 1.5 },
            px: { xs: 1.5, sm: 2 }
          }}
        >
          Add Camera
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleToggleDeleteMode}
          sx={{
            backgroundColor: '#ef4444',
            color: 'white',
            '&:hover': {
              backgroundColor: '#dc2626',
            },
            fontWeight: 600,
            fontSize: { xs: '0.8rem', sm: '0.875rem' },
            py: { xs: 1, sm: 1.5 },
            px: { xs: 1.5, sm: 2 }
          }}
        >
          {isDeleteMode ? 'Cancel' : 'Delete'}
        </Button>
        <Fade in={isDeleteMode && selectedCameras.length > 0}>
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={handleDeleteCameras}
            sx={{ 
              backgroundColor: '#ef4444',
              color: 'white',
              '&:hover': {
                backgroundColor: '#dc2626',
              },
              fontWeight: 600,
              fontSize: { xs: '0.8rem', sm: '0.875rem' },
              py: { xs: 1, sm: 1.5 },
              px: { xs: 1.5, sm: 2 }
            }}
          >
            Delete {selectedCameras.length} Camera(s)
          </Button>
        </Fade>
      </Box>
      
      {allCameras.length > 0 ? (
        <Box>
          <Paper sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <List>
              {currentCameras.map((camera, index) => (
                <Box key={camera.id}>
                  <ListItem
                    disablePadding
                    secondaryAction={
                      isDeleteMode ? (
                        <Checkbox
                          edge="end"
                          checked={selectedCameras.includes(camera.id)}
                          onChange={() => handleCameraClick(camera)}
                        />
                      ) : (
                        <ChevronRightIcon color="action" />
                      )
                    }
                  >
                    <ListItemButton
                      onClick={() => handleCameraClick(camera)}
                      selected={selectedCameras.includes(camera.id) && isDeleteMode}
                      sx={{ py: 2 }}
                    >
                      <ListItemIcon>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          <VideocamIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {camera.name}
                            </Typography>
                            <Chip
                              icon={<CircleIcon />}
                              label={camera.status}
                              size="small"
                              color={
                                camera.status === 'Online' ? 'success' :
                                camera.status === 'Recording' ? 'primary' :
                                camera.status === 'Error' ? 'error' : 'default'
                              }
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              <strong>Room:</strong> {camera.roomName}
                            </Typography>
                            {camera.streamUrl && (
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                <strong>Stream:</strong> {camera.streamUrl}
                              </Typography>
                            )}
                            {camera.note && (
                              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                {camera.note}
                              </Typography>
                            )}
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < currentCameras.length - 1 && <Divider />}
                </Box>
              ))}
            </List>
          </Paper>
          
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                variant="outlined"
                shape="rounded"
                size="large"
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&.Mui-selected': {
                      backgroundColor: '#8CCDEB',
                      color: '#0B1D51',
                      '&:hover': {
                        backgroundColor: '#5a9fd4',
                      },
                    },
                  },
                }}
              />
            </Box>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Showing {startIndex + 1}-{Math.min(endIndex, allCameras.length)} of {allCameras.length} cameras
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Page {currentPage} of {totalPages}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Paper 
          sx={{ 
            p: 6, 
            textAlign: 'center',
            border: '2px dashed',
            borderColor: 'grey.300',
            backgroundColor: 'grey.50'
          }}
        >
          <Typography variant="h4" component="h2" sx={{ mb: 2, color: 'text.secondary' }}>
            No Cameras Available
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
            There are currently no cameras configured in any examination rooms.
          </Typography>
        </Paper>
      )}
      
      <AddCameraWithRoomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddCamera={(roomId, camera) => {
          setRooms(prevRooms => 
            prevRooms.map(room =>
              room.id === roomId
                ? { ...room, cameras: [...room.cameras, camera] }
                : room
            )
          );
          setIsAddModalOpen(false);
        }}
        rooms={rooms}
      />
    </Container>
  );
}

export default CamerasPage;
