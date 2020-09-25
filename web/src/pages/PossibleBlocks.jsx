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
import { pre } from 'lodash';

import Layout from '~/components/Layout/Internal';
import { Heading } from '~/components/Layout';
import { PageTitle } from '~/components/Tipography';
import { useCurrentUser } from '~/utils/user';
import RightTab from '~/components/Modal/RightTab';
import { Select } from '~/components/Form';
import * as rapApi from '~/utils/apiRap';

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
  const arr = tipos.map(tipo => {
    const { tipoInformacaoId: value, tipoInformacaoDescricao: label } = tipo;
    return { value, label };
  });

  arr.splice(0, 0, defaultTipoInfo);
  return arr;
};

const PossibleBlocks = () => {
  const { budgetYear } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [unidade, setUnidade] = useState(defaultUnidade);
  const [gestor, setGestor] = useState(defaultGestor);
  const [tipoInfo, setTipoInfo] = useState(defaultTipoInfo);
  const [unidades, setUnidades] = useState([]);
  const [gestores, setGestores] = useState([]);
  const [tiposInformacoes, setTiposInformacoes] = useState([]);
  const { physicalLotationAbbreviation } = useCurrentUser();

  const handleFilterVisibility = event => {
    event.preventDefault();
    setShowFilters(prev => !prev);
  };

  useEffect(() => {
    const fetchUnidades = async () => {
      const response = await rapApi.getUnidades();
      setUnidades(formatUnidades(response.data));
    };

    const fetchGestores = async () => {
      const response = await rapApi.getGestores();
      setGestores(formatGestores(response.data));
    };

    const fetchTiposInformacoes = async anoExecucao => {
      const response = await rapApi.getTiposInformacoes(anoExecucao);
      setTiposInformacoes(formatTiposInformacoes(response.data));
    };

    fetchUnidades();
    fetchGestores();
    fetchTiposInformacoes(parseInt(budgetYear) + 2);
  }, []);

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
