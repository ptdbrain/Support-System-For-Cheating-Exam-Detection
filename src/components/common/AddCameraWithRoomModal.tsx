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
import { Camera, RoomWithCameras } from '../../types/index';

interface AddCameraWithRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCamera: (roomId: number, camera: Camera) => void;
  rooms: RoomWithCameras[];
}

function AddCameraWithRoomModal({ 
  isOpen, 
  onClose, 
  onAddCamera, 
  rooms 
}: AddCameraWithRoomModalProps): JSX.Element {
  const [cameraName, setCameraName] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState<number | ''>('');
  const [note, setNote] = useState('');

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

    const selectedRoom = rooms.find(room => room.id === selectedRoomId);
    
    if (!selectedRoom) {
      alert('Selected room not found');
      return;
    }

    // Generate unique camera ID across all cameras
    const allCameras = rooms.flatMap(room => room.cameras);
    const maxCameraId = allCameras.reduce((max, camera) => 
      camera.id > max ? camera.id : max, 0
    );

    const newCamera: Camera = {
      id: maxCameraId + 1,
      name: cameraName,
      status: 'Offline',
      note: note || undefined
    };

    onAddCamera(selectedRoomId, newCamera);
    
    // Reset form
    setCameraName('');
    setSelectedRoomId('');
    setNote('');
    onClose();
  };

  const handleClose = () => {
    setCameraName('');
    setSelectedRoomId('');
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
                onChange={(e) => setSelectedRoomId(e.target.value as number)}
              >
                {rooms.map(room => (
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

            <TextField
              fullWidth
              label="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional notes about this camera"
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
            Add Camera
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

export default AddCameraWithRoomModal;
