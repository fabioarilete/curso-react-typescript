import { Routes, Route, Navigate } from 'react-router-dom';
import { UseDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = UseDrawerContext();

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
      <Route path="/pagina-inicial" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
