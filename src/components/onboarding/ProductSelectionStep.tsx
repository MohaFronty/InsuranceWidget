import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import scaleBalanceIcon from '../../assets/scale-balance.png';
import medicationIcon from '../../assets/medication-outline.png';
import IframeMessenger from '../../utils/iframeMessaging';

interface ProductSelectionStepProps {
  selectedProduct: string;
  onNext: () => void;
  onUpdateData: (data: { selectedProduct: string; benefitPackage?: string }) => void;
}

const ProductSelectionStep = ({ selectedProduct, onNext, onUpdateData }: ProductSelectionStepProps) => {
  const theme = useTheme();
  const [selected, setSelected] = useState(selectedProduct);

  const handleProductSelect = (product: string, benefitPackage: string) => {
    setSelected(product);
    onUpdateData({ selectedProduct: product, benefitPackage });
  };

  const handleNext = () => {
    if (selected) {
      onNext();
    } else {
      // Send validation error to parent
      const messenger = IframeMessenger.getInstance();
      messenger.sendToParent({
        type: 'ERROR',
        payload: {
          field: 'selectedProduct',
          message: 'Please select a product to continue',
          step: 'product-selection'
        }
      });
    }
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: 'text.primary', fontFamily: '"Inter", sans-serif' }}>
        What Product would you like?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto', fontFamily: '"Open Sans", sans-serif' }}>
        Choose the insurance product that best fits your needs. We offer comprehensive 
        legal insurance for legal matters and medical cash plans for healthcare expenses. 
        Select the option that provides the coverage you're looking for.
      </Typography>

  <Box
        sx={{
          display: 'flex',
          gap: 3,
          justifyContent: 'center',
          mb: 4,
          flexDirection: { xs: 'column', md: 'row' },
          maxWidth: 800,
          mx: 'auto',
        }}
      >
        <Card
          sx={{
            width: { xs: '100%', md: 300 },
            height: 200,
            cursor: 'pointer',
            backgroundColor: selected === 'legal' ? theme.palette.primary.main : 'white',
            color: selected === 'legal' ? theme.palette.primary.contrastText : theme.palette.text.primary,
            border: selected === 'legal' ? `2px solid ${theme.palette.primary.main}` : `2px solid ${theme.palette.grey[200]}`,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[4],
            },
          }}
          onClick={() => handleProductSelect('legal', 'KSH 100,000')}
        >
          <CardContent sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: theme.palette.secondary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <img 
                src={scaleBalanceIcon} 
                alt="Legal Insurance" 
                style={{ width: 30, height: 30, filter: 'brightness(0) invert(1)' }} 
              />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Legal Insurance ?
            </Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: { xs: '100%', md: 300 },
            height: 200,
            cursor: 'pointer',
            backgroundColor: selected === 'medical' ? '#625B71' : 'white',
            color: selected === 'medical' ? 'white' : '#333',
            border: selected === 'medical' ? '2px solid #625B71' : '2px solid #e2e8f0',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: theme.shadows[4],
            },
          }}
          onClick={() => handleProductSelect('medical', 'KSH 50,000')}
        >
      <CardContent sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: theme.palette.secondary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <img 
                src={medicationIcon} 
                alt="Medical Cash Plan" 
                style={{ width: 30, height: 30, filter: 'brightness(0) invert(1)' }} 
              />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Medical Cash Plan ?
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleNext}
          disabled={!selected}
          sx={{
            px: 6,
            py: 1.5,
            borderRadius: 2,
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: theme.palette.secondary.dark,
            },
            '&:disabled': {
              backgroundColor: theme.palette.grey[300],
              color: theme.palette.text.disabled,
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ProductSelectionStep;
