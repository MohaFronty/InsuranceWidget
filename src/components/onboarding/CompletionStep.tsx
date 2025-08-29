import { Box, Typography, Button, Paper, Avatar, Chip } from '@mui/material';
import { CheckCircle, Launch, Settings, Dashboard } from '@mui/icons-material';

interface CompletionStepProps {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    preferences: {
      notifications: boolean;
      emailUpdates: boolean;
      theme: string;
    };
  };
}

const CompletionStep = ({ userData }: CompletionStepProps) => {
  const handleGetStarted = () => {
    console.log('Onboarding completed!', userData);
  };

  return (
    <Box sx={{ py: 4, textAlign: 'center' }}>
      <Box sx={{ mb: 6 }}>
        <CheckCircle
          sx={{
            fontSize: 80,
            color: 'success.main',
            mb: 3,
          }}
        />
        <Typography variant="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          You're All Set!
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
          Welcome to our platform, {userData.firstName}! Your account has been successfully configured.
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          maxWidth: 600,
          mx: 'auto',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          mb: 6,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Account Summary
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
          <Avatar
            sx={{
              width: 60,
              height: 60,
              bgcolor: 'primary.main',
              fontSize: '1.5rem',
              fontWeight: 'bold',
            }}
          >
            {userData.firstName[0]}{userData.lastName[0]}
          </Avatar>
          <Box sx={{ textAlign: 'left' }}>
            <Typography variant="h6" fontWeight="bold">
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData.phone}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>
            Your Preferences
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Chip
              label={userData.preferences.notifications ? 'Push Notifications: On' : 'Push Notifications: Off'}
              color={userData.preferences.notifications ? 'success' : 'default'}
              variant="outlined"
            />
            <Chip
              label={userData.preferences.emailUpdates ? 'Email Updates: On' : 'Email Updates: Off'}
              color={userData.preferences.emailUpdates ? 'success' : 'default'}
              variant="outlined"
            />
            <Chip
              label={`Theme: ${userData.preferences.theme}`}
              color="primary"
              variant="outlined"
            />
          </Box>
        </Box>
      </Paper>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          What's Next?
        </Typography>
        
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Dashboard sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="subtitle2" fontWeight="bold">
              Explore Dashboard
            </Typography>
          </Paper>
          
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Settings sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="subtitle2" fontWeight="bold">
              Customize Settings
            </Typography>
          </Paper>
          
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Launch sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
            <Typography variant="subtitle2" fontWeight="bold">
              Start Your Journey
            </Typography>
          </Paper>
        </Box>
      </Box>

      <Button
        variant="contained"
        size="large"
        onClick={handleGetStarted}
        sx={{
          px: 6,
          py: 1.5,
          fontSize: '1.1rem',
          borderRadius: 3,
          background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',
          '&:hover': {
            background: 'linear-gradient(45deg, #2563EB, #7C3AED)',
          },
        }}
      >
        Launch Dashboard
      </Button>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', mt: 3 }}
      >
        You can always change these preferences later in your account settings
      </Typography>
    </Box>
  );
};

export default CompletionStep;
