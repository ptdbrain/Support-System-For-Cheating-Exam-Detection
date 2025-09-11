import { 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  Box, 
  Button, 
  Checkbox,
  Chip,
  Paper
} from '@mui/material';
import { 
  Videocam as VideocamIcon, 
  Fullscreen as FullscreenIcon,
  FiberManualRecord as DotIcon
} from '@mui/icons-material';
import { CameraPreviewProps } from '../../types/index';
import { alertColors } from '../../theme/theme';

function CameraPreview({ camera, alertLevel, onClick, isDeleteMode = false, isSelected = false }: CameraPreviewProps): JSX.Element {
  const handleClick = (event: React.MouseEvent) => {
    if (isDeleteMode) {
      event.stopPropagation();
    }
    onClick();
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: isSelected ? '2px solid' : '1px solid',
        borderColor: isSelected ? 'error.main' : alertColors[alertLevel],
        position: 'relative',
        '&:hover': {
          transform: isDeleteMode ? 'none' : 'translateY(-2px)',
          boxShadow: isDeleteMode ? 2 : 4,
        }
      }}
      onClick={handleClick}
    >
      {isDeleteMode && (
        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 2 }}>
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
      
      <CardContent sx={{ p: 2, pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            {camera.name}
          </Typography>
          {alertLevel !== 'none' && (
            <Chip
              size="small"
              label={alertLevel.toUpperCase()}
              sx={{
                backgroundColor: alertColors[alertLevel],
                color: 'white',
                fontWeight: 600
              }}
            />
          )}
        </Box>
        
        <Paper 
          sx={{ 
            height: 200, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            backgroundColor: 'grey.900',
            color: 'white',
            mb: 2,
            border: `2px solid ${alertColors[alertLevel]}`,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <VideocamIcon sx={{ fontSize: 48, mb: 1, opacity: 0.7 }} />
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              Live Feed
            </Typography>
          </Box>
        </Paper>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DotIcon 
            sx={{ 
              color: '#10b981',
              fontSize: 12,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.5 }
              }
            }} 
          />
          <Typography variant="body2" color="success.main" sx={{ fontWeight: 500 }}>
            Live Camera Feed
          </Typography>
        </Box>
      </CardContent>
      
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="outlined"
          startIcon={<FullscreenIcon />}
          fullWidth
          size="small"
          onClick={(e) => {
            if (!isDeleteMode) {
              e.stopPropagation();
              onClick();
            }
          }}
        >
          View Full Screen
        </Button>
      </CardActions>
    </Card>
  );
}

export default CameraPreview;
