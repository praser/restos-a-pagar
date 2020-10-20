import React from 'react';
import {
  faCalendar,
  faDollarSign,
  faFileContract,
  faMoneyCheckAlt,
} from '@fortawesome/free-solid-svg-icons';
import { Row } from '~/components/Layout';
import Highlight from '~/components/Highlight';
import { formatCurrencyShort, formatInteger } from '~/utils/numbers';
import Progressbar from '~/components/Progressbar';
import { percentElapsedTime, remainingDays } from '~/utils/dates';
import { last } from 'lodash';

const Highlights = ({ estatisticas, dataBloqueio }) => {
  const {
    quantidade_operacoes: countOperacoes,
    quantidade_notas_empenho: countEmpenhos,
    saldo_notas_empenho: balanceEmpenhos,
  } = last(estatisticas.estatisticas);

  return (
    <Row>
      <Highlight
        icon={faFileContract}
        siblings={4}
        title="Quantidade de operações"
      >
        {formatInteger(countOperacoes)}
      </Highlight>
      <Highlight
        icon={faMoneyCheckAlt}
        siblings={4}
        title="Quantidade de notas de empenho"
        variant="success"
      >
        {formatInteger(countEmpenhos)}
      </Highlight>
      <Highlight
        icon={faDollarSign}
        siblings={4}
        title="Saldo passível de bloqueio"
        variant="info"
      >
        {formatCurrencyShort(balanceEmpenhos)}
      </Highlight>
      <Highlight
        icon={faCalendar}
        siblings={4}
        title="Dias até o bloqueio"
        variant="warning"
      >
        <div style={{ display: 'flex' }}>
          {remainingDays(dataBloqueio)}{' '}
          <Progressbar
            width={`${percentElapsedTime(dataBloqueio)}%`}
            variant="warning"
          />
        </div>
      </Highlight>
    </Row>
  );
};

export default Highlights;
