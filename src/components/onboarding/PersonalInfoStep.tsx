import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
} from '@mui/material';
import { Person, Email, Phone } from '@mui/icons-material';
import IframeMessenger from '../../utils/iframeMessaging';

interface PersonalInfoStepProps {
  userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  onNext: () => void;
  onBack: () => void;
  onUpdateData: (data: Partial<PersonalInfoStepProps['userData']>) => void;
}

const PersonalInfoStep = ({ userData, onNext, onBack, onUpdateData }: PersonalInfoStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const messenger = IframeMessenger.getInstance();

    if (!userData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'firstName',
          message: 'First name is required',
          step: 'personal-info'
        }
      });
    }

    if (!userData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'lastName',
          message: 'Last name is required',
          step: 'personal-info'
        }
      });
    }

    if (!userData.email.trim()) {
      newErrors.email = 'Email is required';
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'email',
          message: 'Email is required',
          step: 'personal-info'
        }
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = 'Please enter a valid email address';
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'email',
          message: 'Invalid email format',
          step: 'personal-info'
        }
      });
    }

    if (!userData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'phone',
          message: 'Phone number is required',
          step: 'personal-info'
        }
      });
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(userData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'phone',
          message: 'Invalid phone format',
          step: 'personal-info'
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    onUpdateData({ [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold' }}>
          Tell us about yourself
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 500, mx: 'auto' }}>
          We'll use this information to personalize your experience and keep you connected.
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              fullWidth
              label="First Name"
              value={userData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              error={!!errors.firstName}
              helperText={errors.firstName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Last Name"
              value={userData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            value={userData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Phone Number"
            value={userData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="+1 (555) 123-4567"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Phone color="action" />
                </InputAdornment>
              ),
            }}
          />
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
          onClick={handleNext}
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

export default PersonalInfoStep;
