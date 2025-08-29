import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Modal,
  Fade,
} from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import Confetti from 'react-confetti';

interface ApplicationData {
  selectedProduct: string;
  benefitPackage: string;
  principalDetails: {
    fullName: string;
    dateOfBirth: string;
    nationalId: string;
    mobileNumber: string;
    gender: string;
    residentialAddress: string;
  };
  dependants: Array<{
    fullName: string;
    dateOfBirth: string;
    nationalId: string;
    mobileNumber: string;
    gender: string;
    relationship: string;
  }>;
}

interface ReviewPayStepProps {
  applicationData: ApplicationData;
  onBack: () => void;
  onComplete?: () => void;
}

const ReviewPayStep = ({ applicationData, onBack, onComplete }: ReviewPayStepProps) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBuyPolicy = () => {
    // Handle policy purchase
    console.log('Purchasing policy...', applicationData);
    
    setShowSuccessModal(true);
    setShowConfetti(true);
    
    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    setShowConfetti(false);
    
    // Notify parent of completion
    if (onComplete) {
      onComplete();
    }
  };

  const getProductDisplayName = (product: string) => {
    switch (product) {
      case 'legal':
        return 'Legal Insurance';
      case 'medical':
        return 'Medical Cash Plan';
      default:
        return product;
    }
  };

  const getPrincipalName = () => {
    return applicationData.principalDetails?.fullName || 'John Doe';
  };

  const getAnnualPremium = () => {
    switch (applicationData.selectedProduct) {
      case 'legal':
        return 'KSH 300';
      case 'medical':
        return 'KSH 250';
      default:
        return 'KSH 300';
    }
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary', fontFamily: '"Inter", sans-serif' }}>
        Review Details
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, fontFamily: '"Open Sans", sans-serif' }}>
        Please review your application details carefully before proceeding with payment. 
        Make sure all information is correct as changes after policy purchase may require 
        additional verification. Your premium will be calculated based on your selections.
      </Typography>

  <Card
        sx={{
          maxWidth: 600,
          mx: 'auto',
          mb: 4,
          border: '1px solid #e0e0e0',
          borderRadius: 2,
          boxShadow: 'none',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
            Summary of Your Application
          </Typography>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                Product Type
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {getProductDisplayName(applicationData.selectedProduct)}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                Selected Benefit Package:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {applicationData.benefitPackage || 'KSH 100,000'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                Principal Member
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {getPrincipalName()}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Total Annual Premium
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {getAnnualPremium()}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            fullWidth
            onClick={handleBuyPolicy}
            sx={{
              py: 2,
              borderRadius: 2,
              backgroundColor: (theme) => theme.palette.success.main,
              color: (theme) => theme.palette.success.contrastText,
              fontWeight: 'bold',
              fontSize: '1.1rem',
              '&:hover': {
                backgroundColor: (theme) => theme.palette.success.dark,
              },
            }}
          >
            Buy Policy
          </Button>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          onClick={onBack}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            borderColor: '#e0e0e0',
            color: '#666',
          }}
        >
          Back
        </Button>
      </Box>

      {/* Confetti Animation */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}

      {/* Success Modal */}
      <Modal
        open={showSuccessModal}
        onClose={handleCloseModal}
        closeAfterTransition
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Fade in={showSuccessModal}>
          <Card
            sx={{
              maxWidth: 400,
              p: 4,
              textAlign: 'center',
              borderRadius: 3,
              boxShadow: 24,
              outline: 'none',
            }}
          >
            <CardContent>
              <CheckCircle
                sx={{
                  fontSize: 80,
                  color: 'success.main',
                  mb: 2,
                }}
              />
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'success.main' }}>
                🎉 Congratulations!
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Policy Purchase Successful!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Your {getProductDisplayName(applicationData.selectedProduct)} policy has been 
                successfully purchased. Welcome to our family, {getPrincipalName()}!
              </Typography>
              <Button
                variant="contained"
                onClick={handleCloseModal}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #2563EB, #7C3AED)',
                  },
                }}
              >
                Continue to Dashboard
              </Button>
            </CardContent>
          </Card>
        </Fade>
      </Modal>
    </Box>
  );
};

export default ReviewPayStep;
