import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const handleSave = () => {
    console.log('save');
  };

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <LayoutBaseDePagina
      titulo="Detalhe de Pessoa"
      barraDeFerramentas={
        <FerramentasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoNovo={id !== 'nova'}
          mostrarBotaoApagar={id !== 'nova'}
          aoClicarEmSalvar={() => {
            handleSave;
          }}
          aoClicarEmSalvarEFechar={() => {
            handleSave;
          }}
          aoClicarEmApagar={() => {
            handleDelete;
          }}
          aoClicarEmNovo={() => {
            navigate('/pessoas/detalhe/nova');
          }}
          aoClicarEmVoltar={() => {
            navigate('/pessoas');
          }}
        />
      }
    >
      <div>Detalhe de Pessoas</div>
    </LayoutBaseDePagina>
  );
};
