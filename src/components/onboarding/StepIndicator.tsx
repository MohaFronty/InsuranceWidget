import { Box, Typography } from '@mui/material';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = ['Select Product', 'Principal Details', 'Add dependants', 'Review & Pay'];

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      mb: { xs: 3, md: 4 },
      px: { xs: 1, md: 2 },
      flexWrap: { xs: 'wrap', md: 'nowrap' },
      gap: { xs: 1, md: 0 }
    }}>
      {steps.map((label, idx) => {
        const step = idx + 1;
        const isActive = step === currentStep;
        const isCompleted = step < currentStep;

        return (
          <Box 
            key={label} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              minWidth: { xs: '45%', sm: 'auto' },
              justifyContent: { xs: 'center', md: 'flex-start' },
              mb: { xs: 1, md: 0 }
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 0.5, md: 1 },
              flexDirection: { xs: 'column', sm: 'row' }
            }}>
              <Box
                sx={{
                  width: { xs: 28, md: 32 },
                  height: { xs: 28, md: 32 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isActive || isCompleted ? 'success.main' : '#E0E0E0',
                  color: isActive || isCompleted ? 'white' : '#9E9E9E',
                  fontSize: { xs: '12px', md: '14px' },
                  fontWeight: 600,
                  fontFamily: '"Montserrat", sans-serif',
                  flexShrink: 0
                }}
              >
                {step}
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: isActive ? '#333' : '#999',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: { xs: '11px', sm: '12px', md: '14px' },
                  fontFamily: '"Montserrat", sans-serif',
                  textAlign: { xs: 'center', sm: 'left' },
                  lineHeight: 1.2,
                  maxWidth: { xs: '80px', sm: 'none' },
                  wordBreak: { xs: 'break-word', sm: 'normal' }
                }}
              >
                {label}
              </Typography>
            </Box>

            {idx < steps.length - 1 && (
              <Box sx={{ 
                width: { xs: 16, sm: 20, md: 32 }, 
                height: 2, 
                backgroundColor: '#B8B8B8', 
                mx: { xs: 1, sm: 1.5, md: 2.5 },
                display: { xs: 'none', sm: 'block' },
                flexShrink: 0
              }} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default StepIndicator;
