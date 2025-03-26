import { FerramentasDeDetalhe } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import {
  Box,
  Button,
  Grid2,
  InputLabel,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>();

  useEffect(() => {
    if (id !== 'nova') {
      setIsLoading(true);

      PessoasService.getById(Number(id)).then(result => {
        setIsLoading(false);

        if (result instanceof Error) {
          alert(result.message);
          navigate('/pessoas');
        } else {
          setValue('cidadeId', result.cidadeId);
          setValue('email', result.email);
          setValue('nomeCompleto', result.nomeCompleto);
          setNome(result.nomeCompleto);
        }
      });
    } else {
      setValue('nomeCompleto', '');
      setValue('email', '');
      setValue('cidadeId', '' as any);
    }
  }, [id]);

  function handleSave(dados: IFormData) {
    setIsLoading(true);
    console.log('teste');
    if (id === 'nova') {
      PessoasService.create(dados).then(res => {
        setIsLoading(false);
        if (res instanceof Error) {
          alert(res.message);
        } else {
          navigate(`/pessoas`);
        }
      });
    } else {
      PessoasService.updateById(Number(id), { id: Number(id), ...dados }).then(res => {
        setIsLoading(false);
        if (res instanceof Error) {
          alert(res.message);
        } else {
          navigate(`/pessoas`);
        }
      });
    }
  }

  function handleCreatePessoa(dados: IFormData) {
    handleSave(dados);
    setNome(dados.nomeCompleto);
    alert(`${dados.nomeCompleto}, você foi cadastrado com sucesso!`);
  }

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
          aoClicarEmSalvar={() => handleSubmit(handleCreatePessoa)()}
          aoClicarEmSalvarEFechar={() => handleSubmit(handleCreatePessoa)()}
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
      <form>
        <Box component={Paper} variant="outlined" margin={1} display="flex" flexDirection="column">
          <Grid2>{isLoading && <LinearProgress variant="indeterminate" />}</Grid2>
          <Grid2 container direction="column" padding={2} spacing={2}>
            <Grid2>
              <Typography variant="h6">Geral</Typography>
            </Grid2>
            <Grid2 direction="row">
              <Grid2 size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 6 }}>
                <InputLabel htmlFor="component-outlined">Nome completo</InputLabel>
                <TextField
                  fullWidth
                  disabled={isLoading}
                  type="text"
                  {...register('nomeCompleto', { required: true })}
                />
                {errors?.nomeCompleto?.type === 'required' && (
                  <Typography variant="caption" sx={{ color: 'red' }}>
                    Nome é requerido!
                  </Typography>
                )}
              </Grid2>
            </Grid2>
            <Grid2 direction="row">
              <Grid2 size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 6 }}>
                <InputLabel htmlFor="component-outlined">E-mail</InputLabel>
                <TextField
                  fullWidth
                  disabled={isLoading}
                  type="text"
                  {...register('email', { required: true })}
                />
                {errors?.email?.type === 'required' && (
                  <Typography variant="caption" sx={{ color: 'red' }}>
                    E-mail é requerido!
                  </Typography>
                )}
              </Grid2>
            </Grid2>
            <Grid2 direction="row">
              <Grid2 size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 6 }}>
                <InputLabel htmlFor="component-outlined">Cidade</InputLabel>
                <TextField
                  fullWidth
                  disabled={isLoading}
                  type="text"
                  {...register('cidadeId', { required: true })}
                />
                {errors?.cidadeId?.type === 'required' && (
                  <Typography variant="caption" sx={{ color: 'red' }}>
                    Cidade id é requerido!
                  </Typography>
                )}
              </Grid2>
            </Grid2>
          </Grid2>
        </Box>
      </form>
    </LayoutBaseDePagina>
  );
};
