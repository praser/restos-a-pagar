import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faDownload,
  faFilter,
} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import {
  ButtonPrimary,
  SmallButtonPrimary,
  SmallButtonSecondary,
} from '~/components/Button';

import Layout from '~/components/Layout/Internal';
import { Heading } from '~/components/Layout';
import { PageTitle } from '~/components/Tipography';
import { useCurrentUser, useApiRap } from '~/hooks';
import RightTab from '~/components/Modal/RightTab';
import { Select } from '~/components/Form';

const defaultUnidade = { value: null, label: 'Todas as GIGOV/REGOV' };
const defaultGestor = { value: null, label: 'Todos os gestores' };
const defaultTipoInfo = {
  value: 3,
  label: 'Operações que ainda não cumpriram os critérios de desbloqueio',
};

const formatUnidades = unidades => {
  const arr = unidades.map(unidade => {
    const { id: value, nome: label } = unidade;
    return { value, label };
  });

  arr.splice(0, 0, defaultUnidade);
  return arr;
};

const formatGestores = gestores => {
  const arr = gestores.map(gestor => {
    const { siglaGestor: value, nomeGestor } = gestor;
    return { value, label: `${value} - ${nomeGestor}` };
  });

  arr.splice(0, 0, defaultGestor);
  return arr;
};

const formatTiposInformacoes = tipos => {
  return tipos.map(tipo => {
    const { tipoInformacaoId: value, tipoInformacaoDescricao: label } = tipo;
    return { value, label };
  });
};

const PossibleBlocks = ({ setLoading, setAlert }) => {
  const { budgetYear } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [unidade, setUnidade] = useState(defaultUnidade);
  const [gestor, setGestor] = useState(defaultGestor);
  const [tipoInfo, setTipoInfo] = useState([defaultTipoInfo]);
  const [unidades, setUnidades] = useState([defaultUnidade]);
  const [gestores, setGestores] = useState([defaultGestor]);
  const [tiposInformacoes, setTiposInformacoes] = useState([]);
  const { physicalLotationAbbreviation } = useCurrentUser();

  const apiRap = useApiRap();

  const handleFilterVisibility = event => {
    event.preventDefault();
    setShowFilters(prev => !prev);
  };

  useEffect(() => {
    apiRap.then(api => {
      setLoading(true);
      Promise.all([
        api.getUnidades(),
        api.getGestores(),
        api.getTiposInformacoes(parseInt(budgetYear, 10) + 2),
      ])
        .then(res => {
          setUnidades(formatUnidades(res[0].data));
          setGestores(formatGestores(res[1].data));
          setTiposInformacoes(formatTiposInformacoes(res[2].data));
        })
        .finally(() => setTimeout(() => setLoading(false), 500));
    });
  }, [budgetYear]);

  return (
    <Layout>
      <RightTab
        visible={showFilters}
        title="Filtros"
        onClose={handleFilterVisibility}
      >
        <Select
          options={unidades}
          value={unidade}
          onChange={value => setUnidade(value)}
        />
        <Select
          options={gestores}
          value={gestor}
          onChange={value => setGestor(value)}
        />
        <Select
          options={tiposInformacoes}
          value={tipoInfo}
          onChange={value => setTipoInfo(value)}
        />
        <ButtonPrimary>
          <FontAwesomeIcon icon={faCheckCircle} />
          Aplicar filtros
        </ButtonPrimary>
      </RightTab>
      <Heading>
        <PageTitle>
          Gestão de possíveis bloqueios da safra {budgetYear} -{' '}
          {physicalLotationAbbreviation}
        </PageTitle>
        <div>
          <SmallButtonPrimary>
            <FontAwesomeIcon icon={faDownload} />
            Download da base csv
          </SmallButtonPrimary>
          <SmallButtonSecondary onClick={handleFilterVisibility}>
            <FontAwesomeIcon icon={faFilter} />
            Filtros
          </SmallButtonSecondary>
        </div>
      </Heading>
    </Layout>
  );
};

export default PossibleBlocks;
