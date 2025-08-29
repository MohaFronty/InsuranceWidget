import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Box,
  Chip,
  IconButton,
  useTheme,
  LinearProgress,
} from '@mui/material';
import {
  MoreVert,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';

interface ChartData {
  name: string;
  value: number;
  change: number;
  color: string;
}

const RevenueChart: React.FC = () => {
  const theme = useTheme();

  const data: ChartData[] = [
    { name: 'Desktop', value: 63, change: 12.5, color: theme.palette.primary.main },
    { name: 'Mobile', value: 25, change: -2.3, color: '#10B981' },
    { name: 'Tablet', value: 12, change: 8.1, color: '#F59E0B' },
  ];

  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Revenue Sources
          </Typography>
        }
        action={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Chip
              label="This Month"
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          </Box>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
            $124,593
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TrendingUp sx={{ fontSize: 16, color: '#10B981' }} />
            <Typography
              variant="body2"
              sx={{ color: '#10B981', fontWeight: 600 }}
            >
              +8.2%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              from last month
            </Typography>
          </Box>
        </Box>

        <Box sx={{ space: 2 }}>
          {data.map((item, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: item.color,
                    }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {item.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {item.value}%
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                    {item.change > 0 ? (
                      <TrendingUp sx={{ fontSize: 14, color: '#10B981' }} />
                    ) : (
                      <TrendingDown sx={{ fontSize: 14, color: '#EF4444' }} />
                    )}
                    <Typography
                      variant="body2"
                      sx={{
                        color: item.change > 0 ? '#10B981' : '#EF4444',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      {item.change > 0 ? '+' : ''}{item.change}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(item.value / maxValue) * 100}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: theme.palette.grey[200],
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: item.color,
                    borderRadius: 4,
                  },
                }}
              />
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
