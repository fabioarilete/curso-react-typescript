import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components';
import { Form } from '@unform/web';
import { VTextField } from '../../shared/forms';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { FormHandles } from '@unform/core';

interface IFormData {
  email: string;
  cidadeId: string;
  nomeCompleto: string;
}

export const DetalheDePessoas: React.FC = () => {
  const { id = 'nova' } = useParams<'id'>();
  const navigate = useNavigate();

  const formRef = useRef<FormHandles>(null);

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

  const handleSave = (dados: IFormData) => {
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
            formRef.current?.submitForm();
          }}
          aoClicarEmSalvarEFechar={() => {
            formRef.current?.submitForm();
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
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField name="nomeCompleto" />
        <VTextField name="email" />
        <VTextField name="cidadeId" />
      </Form>
    </LayoutBaseDePagina>
  );
};
