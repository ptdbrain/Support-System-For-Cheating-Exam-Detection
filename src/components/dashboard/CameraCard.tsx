import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Chip, 
  Box, 
  Button, 
  Checkbox,
  Avatar,
  Divider
} from '@mui/material';
import { 
  Videocam as VideocamIcon, 
  Visibility as VisibilityIcon,
  Room as RoomIcon
} from '@mui/icons-material';

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

interface CameraCardProps {
  camera: ExtendedCamera;
  onClick: () => void;
  isDeleteMode?: boolean;
  isSelected?: boolean;
}

function CameraCard({ camera, onClick, isDeleteMode = false, isSelected = false }: CameraCardProps): JSX.Element {
  
  const handleClick = (): void => {
    if (isDeleteMode) {
      event.stopPropagation();
    }
    onClick();
  };

  // Extract camera number from camera name (e.g., "CAM 1" -> "1")
  const getCameraNumber = (cameraName: string): string => {
    const match = cameraName.match(/\d+/);
    return match ? match[0] : cameraName;
  };

  // Extract room number from room name (e.g., "Room 101" -> "101")
  const getRoomNumber = (roomName: string): string => {
    const match = roomName.match(/\d+/);
    return match ? match[0] : roomName;
  };


  return (
    <Card 
      sx={{ 
        height: 420,
        minHeight: 420,
        maxHeight: 420,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: isSelected ? '3px solid' : '2px solid',
        borderColor: isSelected ? 'error.main' : 'grey.200',
        position: 'relative',
        '&:hover': {
          transform: isDeleteMode ? 'none' : 'translateY(-4px)',
          boxShadow: isDeleteMode ? 4 : 8,
        }
      }}
      onClick={handleClick}
    >
      {isDeleteMode && (
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
          <Checkbox
            checked={isSelected}
            onChange={(e) => {
              e.stopPropagation();
              onClick();
            }}
            onClick={(e) => e.stopPropagation()}
            sx={{ p: 0 }}
          />
        </Box>
      )}
      
      <CardContent sx={{ pb: 1, p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h3" sx={{ fontWeight: 600, fontSize: '1.5rem' }}>
            {camera.displayName}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.light', width: 48, height: 48 }}>
              <RoomIcon sx={{ fontSize: 24 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="span" sx={{ fontWeight: 600, fontSize: '2rem' }}>
                {getRoomNumber(camera.roomName)}
              </Typography>
              <Typography variant="body1" display="block" color="text.secondary" sx={{ fontSize: '1rem' }}>
                Room
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.light', width: 48, height: 48 }}>
              <VideocamIcon sx={{ fontSize: 24 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="span" sx={{ fontWeight: 600, fontSize: '2rem' }}>
                {getCameraNumber(camera.name)}
              </Typography>
              <Typography variant="body1" display="block" color="text.secondary" sx={{ fontSize: '1rem' }}>
                Camera
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
            Camera Details:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Location:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {camera.roomName}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                Resolution:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                1920x1080
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" color="text.secondary">
                FPS:
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                30
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 3, pt: 0, mt: 'auto' }}>
        <Button
          variant="contained"
          startIcon={<VisibilityIcon />}
          fullWidth
          size="large"
          sx={{ 
            fontWeight: 600, 
            fontSize: '1rem',
            py: 1.5,
            '&:hover': {
              transform: 'scale(1.02)',
              transition: 'all 0.2s ease'
            }
          }}
          onClick={(e) => {
            if (!isDeleteMode) {
              e.stopPropagation();
              onClick();
            }
          }}
        >
          Monitor Camera
        </Button>
      </CardActions>
    </Card>
  );
}

export default CameraCard;
