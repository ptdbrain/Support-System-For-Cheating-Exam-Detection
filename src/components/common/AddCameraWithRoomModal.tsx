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
import { Camera, ExamRoom } from '../../types/index';

interface AddCameraWithRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCamera: (roomId: string, camera: Camera) => void;
  examRooms: ExamRoom[];
}

function AddCameraWithRoomModal({ 
  isOpen, 
  onClose, 
  onAddCamera, 
  examRooms 
}: AddCameraWithRoomModalProps): JSX.Element {
  const [cameraName, setCameraName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cameraName.trim()) {
      alert('Please enter a camera name');
      return;
    }

    if (!selectedRoomId) {
      alert('Please select a room');
      return;
    }

    const selectedRoom = examRooms.find(room => room.id === selectedRoomId);
    
    if (!selectedRoom) {
      alert('Selected room not found');
      return;
    }

    // Generate unique camera ID
    const maxCamNumber = selectedRoom.cameras.reduce((max, camera) => {
      const camNumber = parseInt(camera.name.split(' ')[1] || '0');
      return camNumber > max ? camNumber : max;
    }, 0);

    const newCamNumber = maxCamNumber + 1;
    const cameraId = `cam${newCamNumber}`;

    const newCamera: Camera = {
      id: cameraId,
      name: cameraName
    };

    onAddCamera(selectedRoomId, newCamera);
    
    // Reset form
    setCameraName('');
    setSelectedRoomId('');
    onClose();
  };

  const handleClose = () => {
    setCameraName('');
    setSelectedRoomId('');
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
          Add New Camera
        </Typography>
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl fullWidth required>
              <InputLabel>Select Room</InputLabel>
              <Select
                value={selectedRoomId}
                label="Select Room"
                onChange={(e) => setSelectedRoomId(e.target.value as string)}
              >
                {examRooms.map(room => (
                  <MenuItem key={room.id} value={room.id}>{room.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Camera Name"
              value={cameraName}
              onChange={(e) => setCameraName(e.target.value)}
              placeholder="e.g., CAM 1"
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
            Add Camera
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default AddCameraWithRoomModal;
