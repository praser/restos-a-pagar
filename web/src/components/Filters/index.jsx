import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useApiRap, useCurrentUser, useXHR } from '~/hooks';
import { ButtonPrimary } from '~/components/Button';
import { Select } from '~/components/Form';
import Modal from '~/components/Modal';
import { handleClick, handleVisibility } from './handlers';
import { possibleLocksFilters as alertProps } from '~/utils/messages';
import { initialState, setDefaults, formatData, getRequests } from './utils';
import Can from '~/components/Can';

const Filters = ({ visible, setState: setParentState }) => {
  const { budgetYear } = useParams();
  const [state, setState] = useState(initialState);
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();
  const currentUser = useCurrentUser();

  const fetchData = () => {
    return apiRap
      .then(api => {
        setState(prev => ({ ...prev, ...setDefaults(api, currentUser) }));
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
    <Modal
      visible={visible}
      title="Filtros"
      onClose={() => handleVisibility(setParentState)}
      dismissible
    >
      <Can
        perform="dashboard:filter:unidade"
        yes={() => (
          <Select
            options={state.unidades}
            value={state.unidade}
            onChange={unidade => setState(prev => ({ ...prev, unidade }))}
          />
        )}
      />

      <Can
        perform="dashboard:filter:gestor"
        yes={() => (
          <Select
            options={state.gestores}
            value={state.gestor}
            onChange={gestor => setState(prev => ({ ...prev, gestor }))}
          />
        )}
      />

      <Can
        perform="dashboard:filter:situacao"
        yes={() => (
          <Select
            options={state.tiposInfo}
            value={state.tipoInfo}
            onChange={tipoInfo => setState(prev => ({ ...prev, tipoInfo }))}
          />
        )}
      />

      <Can
        perform="dashboard:filter"
        yes={() => (
          <ButtonPrimary onClick={() => handleClick(setParentState, state)}>
            <FontAwesomeIcon icon={faCheckCircle} />
            Aplicar filtros
          </ButtonPrimary>
        )}
      />
    </Modal>
  );
};

export default Filters;
