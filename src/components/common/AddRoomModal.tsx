import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { ExamRoom } from '../../types/index';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRoom: (room: ExamRoom) => void;
  existingRooms: ExamRoom[];
}

function AddRoomModal({ isOpen, onClose, onAddRoom, existingRooms }: AddRoomModalProps): JSX.Element {
  const [roomName, setRoomName] = useState('');
  const [floor, setFloor] = useState(1);
  const [studentsCount, setStudentsCount] = useState(80);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomName.trim()) {
      alert('Please enter a room name');
      return;
    }

    // Generate unique room ID
    const maxRoomNumber = existingRooms
      .filter(room => room.floor === floor)
      .reduce((max, room) => {
        const roomNumber = parseInt(room.name.split(' ')[1] || '0');
        return roomNumber > max ? roomNumber : max;
      }, floor * 100);

    const newRoomNumber = maxRoomNumber + 1;
    const roomId = `room-${newRoomNumber}`;

    const newRoom: ExamRoom = {
      id: roomId,
      name: roomName,
      status: 'active',
      studentsCount,
      floor,
      cameras: []
    };

    onAddRoom(newRoom);
    
    // Reset form
    setRoomName('');
    setFloor(1);
    setStudentsCount(80);
    onClose();
  };

  const handleClose = () => {
    setRoomName('');
    setFloor(1);
    setStudentsCount(80);
    onClose();
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 0 }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Add New Examination Room
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="e.g., Room 109"
              required
              variant="outlined"
            />

            <FormControl fullWidth>
              <InputLabel>Floor</InputLabel>
              <Select
                value={floor}
                label="Floor"
                onChange={(e) => setFloor(Number(e.target.value))}
              >
                <MenuItem value={1}>Floor 1</MenuItem>
                <MenuItem value={2}>Floor 2</MenuItem>
                <MenuItem value={3}>Floor 3</MenuItem>
                <MenuItem value={4}>Floor 4</MenuItem>
              </Select>
            </FormControl>

            <TextField
              fullWidth
              type="number"
              label="Student Capacity"
              value={studentsCount}
              onChange={(e) => setStudentsCount(parseInt(e.target.value))}
              inputProps={{ min: 1, max: 200 }}
              required
              variant="outlined"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2, gap: 1 }}>
          <Button 
            onClick={handleClose} 
            variant="outlined"
            sx={{ minWidth: 100 }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            sx={{ minWidth: 100, fontWeight: 600 }}
          >
            Add Room
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default AddRoomModal;
