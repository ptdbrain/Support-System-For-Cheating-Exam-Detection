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
import { ExamRoom } from '../types/index';
import { mockExamRooms } from '../data/mockData';
import RoomCard from '../components/dashboard/RoomCard';
import AddRoomModal from '../components/common/AddRoomModal';

function ExamRoomDashboard(): JSX.Element {
  const navigate = useNavigate();
  const [examRooms, setExamRooms] = useState<ExamRoom[]>(mockExamRooms);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  const roomsPerPage = 8;
  const totalPages = Math.ceil(examRooms.length / roomsPerPage);
  
  // Calculate rooms for current page
  const startIndex = (currentPage - 1) * roomsPerPage;
  const endIndex = startIndex + roomsPerPage;
  const currentRooms = examRooms.slice(startIndex, endIndex);

  const handleRoomClick = (roomId: string): void => {
    if (isDeleteMode) {
      setSelectedRooms(prev => 
        prev.includes(roomId) 
          ? prev.filter(id => id !== roomId)
          : [...prev, roomId]
      );
    } else {
      navigate(`/room/${roomId}`);
    }
  };

  const handleAddRooms = (): void => {
    setIsAddModalOpen(true);
  };

  const handleDeleteRooms = (): void => {
    if (selectedRooms.length > 0) {
      if (confirm(`Are you sure you want to delete ${selectedRooms.length} room(s)?`)) {
        setExamRooms(prevRooms => prevRooms.filter(room => !selectedRooms.includes(room.id)));
        setSelectedRooms([]);
        setIsDeleteMode(false);
      }
    }
  };

  const addRoom = (room: ExamRoom): void => {
    setExamRooms(prevRooms => [...prevRooms, room]);
  };

  const handleToggleDeleteMode = (): void => {
    setIsDeleteMode(!isDeleteMode);
    setSelectedRooms([]);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number): void => {
    setCurrentPage(page);
    // Clear selections when changing pages
    setSelectedRooms([]);
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
          onClick={handleAddRooms}
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
          Add Rooms
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
        <Fade in={isDeleteMode && selectedRooms.length > 0}>
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={handleDeleteRooms}
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
            Delete {selectedRooms.length} Room(s)
          </Button>
        </Fade>
      </Box>
      
      {examRooms.length > 0 ? (
        <Box>
          <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
            {currentRooms.map((room) => (
              <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={room.id}>
                <Box sx={{ height: '100%', display: 'flex', justifyContent: 'center' }}>
                  <RoomCard
                    room={room}
                    onClick={() => handleRoomClick(room.id)}
                    isDeleteMode={isDeleteMode}
                    isSelected={selectedRooms.includes(room.id)}
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
              Showing {startIndex + 1}-{Math.min(endIndex, examRooms.length)} of {examRooms.length} rooms
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
            No Examination Rooms
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400, mx: 'auto' }}>
            There are currently no examination rooms configured. Click "Add Rooms" to get started.
          </Typography>
        </Paper>
      )}
      
      <AddRoomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddRoom={addRoom}
        existingRooms={examRooms}
      />
    </Container>
  );
}

export default ExamRoomDashboard;
