import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useApiRap, useXHR } from '~/hooks';
import { ButtonPrimary } from '~/components/Button';
import { Select } from '~/components/Form';
import RightTabSC from '~/components/Modal/RightTab';
import { handleClick, handleVisibility } from './handlers';
import { possibleLocksFilters as alertProps } from '~/utils/messages';
import { initialState, setDefaults, formatData, getRequests } from './utils';

const RightTab = ({ visible, setState: setParentState }) => {
  const { budgetYear } = useParams();
  const [state, setState] = useState(initialState);
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();

  const fetchData = () => {
    return apiRap
      .then(api => {
        setState(prev => ({ ...prev, ...setDefaults(api) }));
        return api;
      })
      .then(api => {
        const success = res => {
          const data = formatData(api, res);
          setState(prev => ({ ...prev, ...data }));
        };

        return doAllXhrRequest({
          requests: getRequests(api, budgetYear),
          alertProps,
          success,
        });
      });
  };

  useEffect(() => {
    fetchData({ apiRap, budgetYear, setState });
  }, [budgetYear]);

  return (
    <RightTabSC
      visible={visible}
      title="Filtros"
      onClose={() => handleVisibility(setParentState)}
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
      <ButtonPrimary onClick={() => handleClick(setParentState, state)}>
        <FontAwesomeIcon icon={faCheckCircle} />
        Aplicar filtros
      </ButtonPrimary>
    </RightTabSC>
  );
};

export default RightTab;
