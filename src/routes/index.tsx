import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard, ListagemDeCidade } from '../pages';
import { ListagemDePessoas } from '../pages/pessoas/ListagemDePessoas';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

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
        icon: 'location_city',
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
      <Route path="/cidades" element={<ListagemDeCidade />} />
      <Route path="/pessoas" element={<ListagemDePessoas />} />
      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
