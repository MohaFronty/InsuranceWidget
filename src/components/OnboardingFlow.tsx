import { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { setCurrentStep, setUserData } from '../store/slices/uiSlice';
import IframeMessenger from '../utils/iframeMessaging';
import ProductSelectionStep from './onboarding/ProductSelectionStep';
import PrincipalDetailsStep from './onboarding/PrincipalDetailsStep';
import DependantsDetailsStep from './onboarding/DependantsDetailsStep';
import ReviewPayStep from './onboarding/ReviewPayStep';
import StepIndicator from './onboarding/StepIndicator';

const OnboardingFlow = () => {
  const dispatch = useDispatch();
  const { currentStep } = useSelector((state: RootState) => state.ui);
  const iframeMessenger = IframeMessenger.getInstance();

  // Step names for iframe messaging
  const stepNames = ['Product Selection', 'Principal Details', 'Dependants Details', 'Review & Pay'];

  const [applicationData, setApplicationDataLocal] = useState({
    selectedProduct: '',
    benefitPackage: '',
    principalDetails: {
      fullName: '',
      dateOfBirth: '',
      nationalId: '',
      mobileNumber: '',
      gender: '',
      residentialAddress: '',
    },
    dependants: [] as Array<{
      fullName: string;
      dateOfBirth: string;
      nationalId: string;
      mobileNumber: string;
      gender: string;
      relationship: string;
    }>,
  });

  useEffect(() => {
    iframeMessenger.requestResize(700);
    iframeMessenger.notifyStepChange(currentStep, stepNames[currentStep - 1]);

    const cleanup = iframeMessenger.onParentMessage((message) => {
      if (message.type === 'CONFIG') {
        console.log('Received config:', message.payload);
      }
    });

    return cleanup;
  }, [currentStep, iframeMessenger, stepNames]);

  const handleNext = () => {
    if (currentStep < 4) {
      const newStep = currentStep + 1;
      dispatch(setCurrentStep(newStep));
      iframeMessenger.notifyStepChange(newStep, stepNames[newStep - 1]);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      dispatch(setCurrentStep(newStep));
      iframeMessenger.notifyStepChange(newStep, stepNames[newStep - 1]);
    }
  };

  const handleUpdateApplicationData = (data: Partial<typeof applicationData>) => {
    const updatedData = { ...applicationData, ...data };
    setApplicationDataLocal(updatedData);
    dispatch(setUserData(updatedData));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProductSelectionStep
            selectedProduct={applicationData.selectedProduct}
            onNext={handleNext}
            onUpdateData={handleUpdateApplicationData}
          />
        );
      case 2:
        return (
          <PrincipalDetailsStep
            principalDetails={applicationData.principalDetails}
            onNext={handleNext}
            onBack={handleBack}
            onUpdateData={handleUpdateApplicationData}
          />
        );
      case 3:
        return (
          <DependantsDetailsStep
            dependants={applicationData.dependants}
            onNext={handleNext}
            onBack={handleBack}
            onUpdateData={handleUpdateApplicationData}
          />
        );
      case 4:
        return (
          <ReviewPayStep
            applicationData={applicationData}
            onBack={handleBack}
            onComplete={() => {
              // Notify parent of completion
              iframeMessenger.notifyCompletion(applicationData);
            }}
          />
        );
      default:
        return (
          <ProductSelectionStep
            selectedProduct={applicationData.selectedProduct}
            onNext={handleNext}
            onUpdateData={handleUpdateApplicationData}
          />
        );
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, md: 4 },
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 1200,
        }}
      >
        <Box sx={{ 
          width: '100%', 
          maxWidth: 900,
          backgroundColor: 'background.paper',
          borderRadius: 2,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          minHeight: { xs: 'auto', md: '600px' },
        }}>
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <StepIndicator currentStep={currentStep} totalSteps={4} />
            <Box sx={{ mt: 2 }}>{renderStep()}</Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default OnboardingFlow;
