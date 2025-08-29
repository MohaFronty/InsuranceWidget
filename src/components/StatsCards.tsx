import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  useTheme,
  alpha,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  People,
  Assignment,
  AttachMoney,
  MoreVert,
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, trend, icon, color }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'visible',
        '&:hover': {
          transform: 'translateY(-4px)',
          transition: 'transform 0.2s ease-in-out',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontWeight: 500, mb: 1 }}
            >
              {title}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 1,
              }}
            >
              {value}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {trend === 'up' ? (
                <TrendingUp sx={{ fontSize: 16, color: '#10B981' }} />
              ) : (
                <TrendingDown sx={{ fontSize: 16, color: '#EF4444' }} />
              )}
              <Typography
                variant="body2"
                sx={{
                  color: trend === 'up' ? '#10B981' : '#EF4444',
                  fontWeight: 600,
                }}
              >
                {change}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                vs last month
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
            <IconButton size="small" sx={{ color: theme.palette.text.secondary }}>
              <MoreVert />
            </IconButton>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: 3,
                backgroundColor: alpha(color, 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color,
              }}
            >
              {icon}
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const StatsCards: React.FC = () => {
  const theme = useTheme();

  const stats = [
    {
      title: 'Total Revenue',
      value: '$45,231',
      change: '+20.1%',
      trend: 'up' as const,
      icon: <AttachMoney sx={{ fontSize: 28 }} />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Active Users',
      value: '2,431',
      change: '+15.3%',
      trend: 'up' as const,
      icon: <People sx={{ fontSize: 28 }} />,
      color: '#10B981',
    },
    {
      title: 'Completed Tasks',
      value: '1,893',
      change: '+8.2%',
      trend: 'up' as const,
      icon: <Assignment sx={{ fontSize: 28 }} />,
      color: '#F59E0B',
    },
    {
      title: 'Bounce Rate',
      value: '12.4%',
      change: '-2.1%',
      trend: 'down' as const,
      icon: <TrendingDown sx={{ fontSize: 28 }} />,
      color: '#EF4444',
    },
  ];

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 3,
      }}
    >
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </Box>
  );
};

export default StatsCards;
