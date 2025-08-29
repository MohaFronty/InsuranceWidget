import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import IframeMessenger from '../../utils/iframeMessaging';

interface PrincipalDetails {
  fullName: string;
  dateOfBirth: string;
  nationalId: string;
  mobileNumber: string;
  gender: string;
  residentialAddress: string;
}

interface PrincipalDetailsStepProps {
  principalDetails: PrincipalDetails;
  onNext: () => void;
  onBack: () => void;
  onUpdateData: (data: { principalDetails: PrincipalDetails }) => void;
}

const PrincipalDetailsStep = ({ principalDetails, onNext, onBack, onUpdateData }: PrincipalDetailsStepProps) => {
  const [formData, setFormData] = useState(principalDetails);
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(
    principalDetails.dateOfBirth ? new Date(principalDetails.dateOfBirth) : null
  );

  const handleInputChange = (field: string, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdateData({ principalDetails: updatedData });
  };

  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date);
    const updatedData = { ...formData, dateOfBirth: date?.toISOString() || '' };
    setFormData(updatedData);
    onUpdateData({ principalDetails: updatedData });
  };

  const handleNext = () => {
    const errors = [];
    const messenger = IframeMessenger.getInstance();
    
    if (!formData.fullName.trim()) {
      errors.push('Full name is required');
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'fullName',
          message: 'Full name is required',
          step: 'principal-details'
        }
      });
    }
    
    if (!formData.nationalId.trim()) {
      errors.push('National ID is required');
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'nationalId',
          message: 'National ID is required',
          step: 'principal-details'
        }
      });
    }
    
    if (!formData.mobileNumber.trim()) {
      errors.push('Mobile number is required');
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'mobileNumber',
          message: 'Mobile number is required',
          step: 'principal-details'
        }
      });
    }
    
    if (!formData.gender || formData.gender.trim() === '') {
      errors.push('Gender is required');
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'gender',
          message: 'Gender is required',
          step: 'principal-details'
        }
      });
    }
    
    if (!formData.residentialAddress.trim()) {
      errors.push('Residential address is required');
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'residentialAddress',
          message: 'Residential address is required',
          step: 'principal-details'
        }
      });
    }
    
    if (!formData.dateOfBirth || formData.dateOfBirth.trim() === '') {
      errors.push('Date of birth is required');
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'dateOfBirth',
          message: 'Date of birth is required',
          step: 'principal-details'
        }
      });
    }

    if (errors.length > 0) {
      console.log('Validation errors:', errors);
      console.log('Form data:', formData);
      console.log('Date of birth state:', dateOfBirth);
      return;
    }

    onNext();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary', fontFamily: '"Inter", sans-serif' }}>
          Principal Details
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 700, fontFamily: '"Open Sans", sans-serif' }}>
          Please provide your personal information to complete your insurance application. 
          All fields are required and this information will be used to process your policy 
          and ensure accurate coverage.
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
            maxWidth: 760,
            mb: 3,
            mx: 'auto',
          }}
        >
          <TextField
            fullWidth
            label="Full Names"
            value={formData.fullName}
            onChange={(e) => handleInputChange('fullName', e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              },
            }}
          />

          <DatePicker
            label="Date Of Birth"
            value={dateOfBirth}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                sx: {
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  },
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="National ID"
            value={formData.nationalId}
            onChange={(e) => handleInputChange('nationalId', e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              },
            }}
          />

          <TextField
            fullWidth
            label="Mobile Number"
            value={formData.mobileNumber}
            onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              },
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Gender</InputLabel>
            <Select
              value={formData.gender}
              label="Gender"
              onChange={(e) => handleInputChange('gender', e.target.value)}
              sx={{
                borderRadius: 1,
              }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Residential Address"
            value={formData.residentialAddress}
            onChange={(e) => handleInputChange('residentialAddress', e.target.value)}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
              },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, maxWidth: 760, mx: 'auto' }}>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              borderColor: 'divider',
              color: 'text.secondary',
            }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              px: 6,
              py: 1.5,
              borderRadius: 2,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default PrincipalDetailsStep;
