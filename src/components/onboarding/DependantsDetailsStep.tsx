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

interface DependantData {
  fullName: string;
  dateOfBirth: string;
  nationalId: string;
  mobileNumber: string;
  gender: string;
  relationship: string;
}

interface DependantsDetailsStepProps {
  dependants: DependantData[];
  onNext: () => void;
  onBack: () => void;
  onUpdateData: (data: { dependants: DependantData[] }) => void;
}

const DependantsDetailsStep = ({ dependants, onNext, onBack, onUpdateData }: DependantsDetailsStepProps) => {
  const [formData, setFormData] = useState<DependantData>({
    fullName: '',
    dateOfBirth: '',
    nationalId: '',
    mobileNumber: '',
    gender: '',
    relationship: '',
  });
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setDateOfBirth(date);
    setFormData(prev => ({ ...prev, dateOfBirth: date?.toISOString() || '' }));
  };

  const addDependant = () => {
    if (isFormValid()) {
      const updatedDependants = [...dependants, formData];
      onUpdateData({ dependants: updatedDependants });
      // Reset form
      setFormData({
        fullName: '',
        dateOfBirth: '',
        nationalId: '',
        mobileNumber: '',
        gender: '',
        relationship: '',
      });
      setDateOfBirth(null);
    }
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.nationalId.trim() !== '' &&
      formData.mobileNumber.trim() !== '' &&
      formData.gender !== '' &&
      formData.relationship !== '' &&
      dateOfBirth !== null
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary', fontFamily: '"Inter", sans-serif' }}>
          Dependants Details
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 700, fontFamily: '"Open Sans", sans-serif' }}>
          Add family members who will be covered under your insurance policy. You can add 
          multiple dependants including spouse, children, parents, or siblings. Each dependant 
          requires their own details for proper coverage verification.
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

          <FormControl fullWidth>
            <InputLabel>Relationship</InputLabel>
            <Select
              value={formData.relationship}
              label="Relationship"
              onChange={(e) => handleInputChange('relationship', e.target.value)}
              sx={{
                borderRadius: 1,
              }}
            >
              <MenuItem value="spouse">Spouse</MenuItem>
              <MenuItem value="child">Child</MenuItem>
              <MenuItem value="parent">Parent</MenuItem>
              <MenuItem value="sibling">Sibling</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {dependants.length > 0 && (
          <Box sx={{ mb: 3, maxWidth: 760, mx: 'auto' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Added Dependants ({dependants.length})
            </Typography>
            {dependants.map((dependant, index) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  mb: 1,
                  backgroundColor: '#f9f9f9',
                }}
              >
                <Typography variant="body2">
                  {dependant.fullName} - {dependant.relationship}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 760, mx: 'auto' }}>
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

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              onClick={addDependant}
              disabled={!isFormValid()}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              Add Dependant
            </Button>
            <Button
              variant="contained"
              onClick={onNext}
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
      </Box>
    </LocalizationProvider>
  );
};

export default DependantsDetailsStep;
