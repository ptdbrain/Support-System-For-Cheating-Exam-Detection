import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Grid, 
  Paper,
  Chip,
  Fade,
  Pagination
} from '@mui/material';
import { 
  Add as AddIcon, 
  Delete as DeleteIcon, 
  Check as CheckIcon 
} from '@mui/icons-material';
import { useProctoring } from '../context/ProctoringContext';
import CameraCard from '../components/dashboard/CameraCard';
import AddCameraWithRoomModal from '../components/common/AddCameraWithRoomModal';

interface ExtendedCamera {
  id: string;
  name: string;
  roomId: string;
  roomName: string;
  displayName: string;
}

function CamerasPage(): JSX.Element {
  const { examRooms, addCamera } = useProctoring();
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedCameras, setSelectedCameras] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const camerasPerPage = 8;
  
  // Flatten all cameras from all rooms with room context
  const allCameras: ExtendedCamera[] = examRooms.flatMap(room => 
    room.cameras.map(camera => ({
      id: `${room.id}-${camera.id}`,
      name: camera.name,
      roomId: room.id,
      roomName: room.name,
      displayName: `${room.name} - ${camera.name}`
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
      // Get the actual camera ID from the original camera data
      const originalCamera = examRooms
        .find(r => r.id === camera.roomId)
        ?.cameras.find(c => c.name === camera.name);
      
      if (originalCamera) {
        navigate(`/room/${camera.roomId}/camera/${originalCamera.id}`);
      }
    }
  };

  const handleDeleteCameras = (): void => {
    if (selectedCameras.length > 0) {
      if (confirm(`Are you sure you want to delete ${selectedCameras.length} camera(s)?`)) {
        // Group deletions by room
        const camerasToDelete = selectedCameras.map(cameraId => {
          const camera = allCameras.find(c => c.id === cameraId);
          return camera;
        }).filter(Boolean) as ExtendedCamera[];
        
        const groupedByRoom = camerasToDelete.reduce((acc, camera) => {
          if (!acc[camera.roomId]) {
            acc[camera.roomId] = [];
          }
          // Get the actual camera ID from the original camera data
          const originalCamera = examRooms
            .find(r => r.id === camera.roomId)
            ?.cameras.find(c => c.name === camera.name);
          
          if (originalCamera) {
            acc[camera.roomId].push(originalCamera.id);
          }
          return acc;
        }, {} as Record<string, string[]>);

        // Note: We would need to implement batch delete functionality in context
        // For now, just reset the selection
        console.log('Would delete cameras:', groupedByRoom);
        setSelectedCameras([]);
        setIsDeleteMode(false);
      }
    }
  };

  const handleToggleDeleteMode = (): void => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedCameras([]);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
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
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
            {currentCameras.map((camera) => (
              <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={camera.id}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
                  <CameraCard
                    camera={camera}
                    onClick={() => handleCameraClick(camera)}
                    isDeleteMode={isDeleteMode}
                    isSelected={selectedCameras.includes(camera.id)}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          
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
          addCamera(roomId, camera);
          setIsAddModalOpen(false);
        }}
        examRooms={examRooms}
      />
    </Container>
  );
}

export default CamerasPage;
