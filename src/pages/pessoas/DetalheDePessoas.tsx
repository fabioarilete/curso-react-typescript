import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { useEffect, useState } from 'react';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { LinearProgress } from '@mui/material';

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('false');

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then(res => {
        setIsLoading(false);
        if (res instanceof Error) {
          alert(res.message);
          navigate('/pessoas');
        } else {
          setNome(res.nomeCompleto);
          console.log(res);
        }
      });
    }
  }, [id]);

  const handleSave = () => {
    console.log('save');
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar esse registro?')) {
      PessoasService.deleteById(id).then(res => {
        if (res instanceof Error) {
          alert(res.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/pessoas');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === 'nova' ? 'Nova Pessoa' : nome}
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
            handleDelete(Number(id));
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
      {isLoading && <LinearProgress variant="indeterminate" />}
      <div>Detalhe de Pessoas</div>
    </LayoutBaseDePagina>
  );
};
