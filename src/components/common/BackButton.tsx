import { Button } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { BackButtonProps } from '../../types/index';

function BackButton({ onClick, label = 'Back' }: BackButtonProps): JSX.Element {
  return (
    <Button
      variant="outlined"
      startIcon={<ArrowBackIcon />}
      onClick={onClick}
      sx={{
        borderColor: 'grey.400',
        color: 'text.primary',
        '&:hover': {
          borderColor: 'primary.main',
          backgroundColor: 'primary.50',
        },
        fontWeight: 500
      }}
    >
      {label}
    </Button>
  );
}

export default BackButton;
