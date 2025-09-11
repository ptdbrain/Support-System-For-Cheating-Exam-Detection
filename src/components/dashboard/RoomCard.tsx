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
  Groups as GroupsIcon, 
  Videocam as VideocamIcon, 
  Visibility as VisibilityIcon 
} from '@mui/icons-material';
import { RoomCardProps } from '../../types/index';
import { statusColors } from '../../theme/theme';

function RoomCard({ room, onClick, isDeleteMode = false, isSelected = false }: RoomCardProps): JSX.Element {
  const handleClick = (event: React.MouseEvent) => {
    if (isDeleteMode) {
      event.stopPropagation();
    }
    onClick();
  };

  // Extract numeric part from room name (e.g., "Room 101" -> "101")
  const getRoomNumber = (roomName: string): string => {
    const match = roomName.match(/\d+/);
    return match ? match[0] : roomName;
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        minHeight: 380,
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
            {getRoomNumber(room.name)}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.light', width: 48, height: 48 }}>
              <GroupsIcon sx={{ fontSize: 24 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="span" sx={{ fontWeight: 600, fontSize: '2rem' }}>
                {room.studentsCount}
              </Typography>
              <Typography variant="body1" display="block" color="text.secondary" sx={{ fontSize: '1rem' }}>
                Slots
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'secondary.light', width: 48, height: 48 }}>
              <VideocamIcon sx={{ fontSize: 24 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="span" sx={{ fontWeight: 600, fontSize: '2rem' }}>
                {room.cameras.length}
              </Typography>
              <Typography variant="body1" display="block" color="text.secondary" sx={{ fontSize: '1rem' }}>
                Cameras
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box>
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600, fontSize: '1.1rem' }}>
            Active Cameras:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {room.cameras.map((camera) => (
              <Chip
                key={camera.id}
                label={camera.name}
                size="medium"
                variant="outlined"
                sx={{ fontSize: '0.875rem', fontWeight: 500 }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 3, pt: 0 }}>
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
          Monitor Room
        </Button>
      </CardActions>
    </Card>
  );
}

export default RoomCard;
