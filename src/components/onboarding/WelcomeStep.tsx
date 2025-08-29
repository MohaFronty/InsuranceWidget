import { Box, Typography, Button, Paper } from '@mui/material';
import { Rocket, Star, Group, TrendingUp } from '@mui/icons-material';

interface WelcomeStepProps {
  onNext: () => void;
}

const WelcomeStep = ({ onNext }: WelcomeStepProps) => {
  const features = [
    {
      icon: <Rocket sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Fast Setup',
      description: 'Get started in just a few minutes with our streamlined onboarding process.',
    },
    {
      icon: <Star sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Premium Features',
      description: 'Access to all premium features and tools to enhance your experience.',
    },
    {
      icon: <Group sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team using our collaborative tools.',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Analytics & Insights',
      description: 'Gain valuable insights with our comprehensive analytics dashboard.',
    },
  ];

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Box sx={{ mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            background: 'linear-gradient(45deg, #3B82F6, #8B5CF6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
          }}
        >
          Welcome to Our Platform
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          We're excited to have you on board! Let's get you set up with everything you need to succeed.
          This quick setup will personalize your experience and get you started in no time.
        </Typography>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
            maxWidth: 800,
            mx: 'auto',
          }}
        >
          {features.map((feature, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 3,
                textAlign: 'center',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 3,
                  borderColor: 'primary.main',
                },
              }}
            >
              <Box sx={{ mb: 2 }}>{feature.icon}</Box>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold' }}>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          size="large"
          onClick={onNext}
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
          Get Started
        </Button>
      </Box>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: 'block', mt: 3 }}
      >
        This setup should take about 2-3 minutes to complete
      </Typography>
    </Box>
  );
};

export default WelcomeStep;
