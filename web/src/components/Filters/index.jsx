import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useApiRap, useCurrentUser, useXHR } from 'hooks';
import { possibleLocksFilters as alertProps } from 'utils/messages';
import { ButtonPrimary } from '../Button';
import { Select } from '../Form';
import Modal from '../Modal';
import { handleClick, handleVisibility } from './handlers';
import { initialState, setDefaults, formatData, getRequests } from './utils';
import Can from '../Can';
import { Context } from '../Store';

const Filters = ({ visible, setState: setParentState }) => {
  const { budgetYear } = useParams();
  const [state, setState] = useState(initialState);
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();
  const currentUser = useCurrentUser();
  const [context] = useContext(Context);
  const { params } = context;
  const [param] = params.filter(
    item => item.anoOrcamentario === parseInt(budgetYear, 10),
  );
  const anoExecucao = param;

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
          requests: getRequests(api, anoExecucao),
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
