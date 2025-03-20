import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { UseDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';

export const AppRoutes = () => {
  const { toggleDrawerOpen, setDrawerOptions } = UseDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: 'Página Incial',
        path: '/pagina-inicial',
        icon: 'home',
      },
      {
        label: 'Cidades',
        path: '/cidades',
        icon: 'star',
      },
      {
        label: 'Pessoas',
        path: '/pessoas',
        icon: 'people',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
