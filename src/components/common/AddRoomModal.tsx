import { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  TextField, 
  Button, 
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { RoomWithCameras } from '../../types/index';

interface AddRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRoom: (room: RoomWithCameras) => void;
  existingRooms: RoomWithCameras[];
}

function AddRoomModal({ isOpen, onClose, onAddRoom, existingRooms }: AddRoomModalProps): JSX.Element {
  const [roomName, setRoomName] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!roomName.trim()) {
      alert('Please enter a room name');
      return;
    }

    // Generate unique room ID
    const maxId = existingRooms.reduce((max, room) => 
      room.id > max ? room.id : max, 0
    );

    const newRoom: RoomWithCameras = {
      id: maxId + 1,
      name: roomName,
      note: note || undefined,
      cameras: []
    };

    onAddRoom(newRoom);
    
    // Reset form
    setRoomName('');
    setNote('');
    onClose();
  };

  const handleClose = () => {
    setRoomName('');
    setNote('');
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

            <TextField
              fullWidth
              label="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional notes about this room"
              variant="outlined"
              multiline
              rows={3}
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
