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

const initialState = {
  showFilters: false,
  unidade: {},
  gestor: {},
  tipoInfo: [],
  unidades: [],
  gestores: [],
  tiposInfo: [],
};

const PossibleLocks = ({ setLoading, setAlert }) => {
  const { budgetYear } = useParams();
  const [state, setState] = useState(initialState);
  const { physicalLotationAbbreviation } = useCurrentUser();

  const apiRap = useApiRap();

  const handleFilterVisibility = event => {
    event.preventDefault();
    setState(prev => {
      const showFilters = !prev.showFilters;
      return { ...prev, showFilters };
    });
  };

  useEffect(() => {
    apiRap
      .then(api => {
        setState(prev => ({
          ...prev,
          unidade: api.defaults.unidade,
          gestor: api.defaults.gestor,
          tipoInfo: [api.defaults.tipoInfo],
          unidades: [api.defaults.unidade],
          gestores: [api.defaults.gestor],
        }));
        return api;
      })
      .then(api => {
        setLoading(true);
        Promise.all([
          api.requests.getUnidades(),
          api.requests.getGestores(),
          api.requests.getTiposInformacoes(parseInt(budgetYear, 10) + 2),
        ])
          .then(res => {
            const unidades = api.formatters.unidades(res[0].data);
            const gestores = api.formatters.gestores(res[1].data);
            const tiposInfo = api.formatters.tiposInfo(res[2].data);
            setState(prev => ({ ...prev, unidades, gestores, tiposInfo }));
          })
          .catch(
            setAlert(prev => ({
              ...prev,
              title: 'Uh-oh...',
              text:
                'Parece que você encontrou um buraco na Maxtrix. Por favor tente novamente',
              visible: true,
            })),
          )
          .finally(() => setTimeout(() => setLoading(false), 500));
      });
  }, [budgetYear]);

  return (
    <Layout>
      <RightTab
        visible={state.showFilters}
        title="Filtros"
        onClose={handleFilterVisibility}
      >
        <Select
          options={state.unidades}
          value={state.unidade}
          onChange={unidade => setState(prev => ({ ...prev, unidade }))}
        />
        <Select
          options={state.gestores}
          value={state.gestor}
          onChange={gestor => setState(prev => ({ ...prev, gestor }))}
        />
        <Select
          options={state.tiposInfo}
          value={state.tipoInfo}
          onChange={tipoInfo => setState(prev => ({ ...prev, tipoInfo }))}
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

export default PossibleLocks;
