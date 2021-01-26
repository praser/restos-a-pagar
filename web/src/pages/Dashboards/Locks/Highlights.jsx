import React, { useCallback, useState } from 'react';
import { last } from 'lodash';
import {
  faCalendarAlt,
  faCameraRetro,
  faHourglassHalf,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons';
import { CardSmallText } from 'components/Card';
import WithZoomHover from 'components/HOC/ZoomHover';
import Modal from 'components/Modal';
import DataTable from 'components/Table/DataTable';
import { useApiRap, useXHR } from 'hooks';
import { Row } from 'components/Layout';
import Highlight from 'components/Highlight';
import Progressbar from 'components/Progressbar';
import {
  formatDate,
  formatISO,
  percentElapsedTime,
  remainingDays,
} from 'utils/dates';
import {
  formatCurrency,
  formatCurrencyShort,
  formatInteger,
} from 'utils/numbers';
import { loadLotesDesbloqueioFail as alertProps } from 'utils/messages';

const Highlights = ({
  estatisticas,
  dataCancelamento,
  dataBloqueio,
  snapshot,
  posicaoBase,
}) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const [modalData, setModalData] = useState([]);
  const apiRap = useApiRap();
  const { doAllXhrRequest } = useXHR();

  const {
    quantidadeOperacoesBloqueadas,
    quantidadeDocumentosBloqueados,
    saldoBloqueado,
    quantidadeOperacoesDesbloqueadas,
    quantidadeDocumentosDesbloqueados,
    saldoDesbloqueado,
    quantidadeOperacoesAguardandoDesbloqueio,
    quantidadeDocumentosAguardandoDesbloqueio,
    saldoAguardandoDesbloqueio,
  } = last(estatisticas);

  const handleModalOnClose = () => setModalVisibility(false);

  const getHighlightTitle = event => {
    const titleClass = 'highlight-title';
    const titleEl = event.currentTarget.getElementsByClassName(titleClass)[0];
    return titleEl.textContent;
  };

  const fetchData = useCallback(
    async args => {
      const api = await apiRap;
      const requests = [api.requests.getEmpenhos(args)];
      const success = res => {
        const { data } = res[0];
        setModalData(data);
        setModalVisibility(true);
      };
      doAllXhrRequest({
        alertProps,
        requests,
        success,
      });
    },
    [apiRap, setModalData, setModalVisibility],
  );

  const getDataType = event => {
    return event.currentTarget.dataset.type;
  };

  const handleHighlightClick = event => {
    setModalTitle(getHighlightTitle(event));
    const tipo = getDataType(event);
    const anoExecucao = 2020;
    fetchData({ anoExecucao, tipo });
  };

  const columns = [
    { name: 'Operação', selector: 'operacao', sortable: true },
    { name: 'Convênio', selector: 'convenio', sortable: true },
    { name: 'GIGOV', selector: 'gigovNome', sortable: true },
    { name: 'Gestor', selector: 'siglaGestor', sortable: true },
    { name: 'Tomador', selector: 'proponente', sortable: true },
    { name: 'NE', selector: 'documento', sortable: true },
    {
      name: 'Saldo',
      selector: 'saldo',
      sortable: true,
      format: ({ saldo }) => formatCurrency(saldo),
    },
    { name: 'Lote', selector: 'loteDesbloqueio', sortable: true },
    {
      name: 'Data do desbloqueio',
      selector: 'dataDesbloqueio',
      sortable: true,
      format: ({ dataDesbloqueio }) => formatISO(dataDesbloqueio),
    },
  ];

  const BloqueadosStn = () => (
    <Highlight
      icon={faCameraRetro}
      title={`Bloqueado STN em ${formatDate(dataBloqueio)}`}
      variant="info"
      onClick={handleHighlightClick}
      data-type="snapshot"
    >
      <p>{formatCurrencyShort(snapshot.saldoBloqueado)}</p>
      <CardSmallText>
        {formatInteger(snapshot.quantidadeOperacoesBloqueadas)} operações
      </CardSmallText>
      <CardSmallText>
        {formatInteger(snapshot.quantidadeDocumentosBloqueados)} notas de
        empenho
      </CardSmallText>
    </Highlight>
  );

  const BloqueadosHoje = () => (
    <Highlight
      icon={faLock}
      title={`Bloqueado em ${formatDate(posicaoBase)}`}
      variant="danger"
      onClick={handleHighlightClick}
      data-type="bloqueado"
    >
      <p>{formatCurrencyShort(saldoBloqueado)}</p>
      <CardSmallText>
        {formatInteger(quantidadeOperacoesBloqueadas)} operações
      </CardSmallText>
      <CardSmallText>
        {formatInteger(quantidadeDocumentosBloqueados)} notas de empenho
      </CardSmallText>
    </Highlight>
  );

  const DesbloqueadosAteHoje = () => (
    <Highlight
      icon={faLockOpen}
      title={`Desbloqueado até ${formatDate(posicaoBase)}`}
      variant="success"
      onClick={handleHighlightClick}
      data-type="desbloqueado"
    >
      <p>{formatCurrencyShort(saldoDesbloqueado)}</p>
      <CardSmallText>
        {formatInteger(quantidadeOperacoesDesbloqueadas)} operações
      </CardSmallText>
      <CardSmallText>
        {formatInteger(quantidadeDocumentosDesbloqueados)} notas de empenho
      </CardSmallText>
    </Highlight>
  );

  const AguardandoProcessamento = () => (
    <Highlight
      icon={faHourglassHalf}
      title="Aguardando processamento"
      variant="warning"
      onClick={handleHighlightClick}
      data-type="aguardando processamento"
    >
      <p>{formatCurrencyShort(saldoAguardandoDesbloqueio)}</p>
      <CardSmallText>
        {formatInteger(quantidadeOperacoesAguardandoDesbloqueio)} operações
      </CardSmallText>
      <CardSmallText>
        {formatInteger(quantidadeDocumentosAguardandoDesbloqueio)} notas de
        empenho
      </CardSmallText>
    </Highlight>
  );

  const BloqueadosStnWithZoomHover = WithZoomHover(BloqueadosStn);
  const BloqueadosHojeWithZoomHover = WithZoomHover(BloqueadosHoje);
  const DesbloqueadosAteHojeWithZoomHover = WithZoomHover(DesbloqueadosAteHoje);
  const AguardandoProcessamentoWithZoomHover = WithZoomHover(
    AguardandoProcessamento,
  );

  return (
    <>
      <Row>
        <BloqueadosStnWithZoomHover />
        <BloqueadosHojeWithZoomHover />
        <DesbloqueadosAteHojeWithZoomHover />
        <AguardandoProcessamentoWithZoomHover />

        <Highlight
          icon={faCalendarAlt}
          title="dias até o cancelamento"
          variant="warning"
        >
          <div style={{ display: 'flex' }}>
            {remainingDays(dataCancelamento)}{' '}
            <Progressbar
              width={`${percentElapsedTime(dataCancelamento, dataBloqueio)}%`}
              variant="warning"
            />
          </div>
        </Highlight>

        <Modal
          title={modalTitle}
          visible={modalVisibility}
          onClose={handleModalOnClose}
          dismissible
        >
          <DataTable
            data={modalData}
            columns={columns}
            noDataText="Não há nenhuma nota de empenho aqui"
            noHeader
            searchable
          />
        </Modal>
      </Row>
    </>
  );
};

export default Highlights;
