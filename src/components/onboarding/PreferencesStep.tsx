import {
  Box,
  Typography,
  Button,
  Paper,
  FormControlLabel,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { Notifications, Email, LightMode, DarkMode } from '@mui/icons-material';

interface PreferencesStepProps {
  userData: {
    preferences: {
      notifications: boolean;
      emailUpdates: boolean;
      theme: string;
    };
  };
  onNext: () => void;
  onBack: () => void;
  onUpdateData: (data: Partial<PreferencesStepProps['userData']>) => void;
}

const PreferencesStep = ({ userData, onNext, onBack, onUpdateData }: PreferencesStepProps) => {
  const handlePreferenceChange = (key: string, value: boolean | string) => {
    onUpdateData({
      preferences: {
        ...userData.preferences,
        [key]: value,
      },
    });
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
          Customize Your Experience
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
          Let's set up your preferences to make the platform work best for you.
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
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Notifications
          </Typography>
          
          <Box sx={{ space: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                mb: 2,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={userData.preferences.notifications}
                    onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Notifications color="action" />
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        Push Notifications
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Get notified about important updates and activities
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ width: '100%', margin: 0 }}
              />
            </Paper>

            <Paper
              elevation={0}
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={userData.preferences.emailUpdates}
                    onChange={(e) => handlePreferenceChange('emailUpdates', e.target.checked)}
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Email color="action" />
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        Email Updates
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Receive weekly summaries and important announcements
                      </Typography>
                    </Box>
                  </Box>
                }
                sx={{ width: '100%', margin: 0 }}
              />
            </Paper>
          </Box>
        </Box>

        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            Appearance
          </Typography>
          
          <Paper
            elevation={0}
            sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
          >
            <Typography variant="body1" fontWeight="medium" sx={{ mb: 2 }}>
              Theme Preference
            </Typography>
            <ToggleButtonGroup
              value={userData.preferences.theme}
              exclusive
              onChange={(_, value) => value && handlePreferenceChange('theme', value)}
              aria-label="theme preference"
              fullWidth
            >
              <ToggleButton value="light" aria-label="light theme">
                <LightMode sx={{ mr: 1 }} />
                Light
              </ToggleButton>
              <ToggleButton value="dark" aria-label="dark theme">
                <DarkMode sx={{ mr: 1 }} />
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </Paper>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6, maxWidth: 600, mx: 'auto' }}>
        <Button
          variant="outlined"
          size="large"
          onClick={onBack}
          sx={{ px: 4 }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={onNext}
          sx={{
            px: 4,
            background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',
            '&:hover': {
              background: 'linear-gradient(45deg, #2563EB, #7C3AED)',
            },
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default PreferencesStep;
