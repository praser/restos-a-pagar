import React, { useState, useEffect } from 'react';
import Loader from 'react-loader-spinner';

import { SimpleTable } from 'components/Table';
import { useApiRap } from 'hooks';
import { formatISO } from 'utils/dates';
import { formatCurrency } from 'utils/numbers';

const InnerList = ({ data }) => {
  const columns = [
    { name: 'Operação', selector: 'operacao' },
    { name: 'Convênio', selector: 'convenio' },
    { name: 'Nota de empenho', selector: 'documento' },
    { name: 'Ano orçamentario', selector: 'anoOrcamentario' },
    {
      name: 'Data emissão',
      selector: 'dataEmissao',
      format: row => formatISO(row.dataEmissao),
    },
    {
      name: 'Saldo bloqueado',
      selector: 'saldoContaContabil',
      format: row => formatCurrency(row.saldoContaContabil),
    },
  ];

  const [dataState, setDataState] = useState([]);
  const [loading, setLoading] = useState(false);
  const apiRap = useApiRap();

  const success = res => {
    setDataState(res.data);
  };

  const table = <SimpleTable data={dataState} columns={columns} />;
  const loader = (
    <center>
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
    </center>
  );

  useEffect(() => {
    setLoading(true);
    apiRap
      .then(api =>
        api.requests.getEmpenhosLiminar(data.id).then(res => success(res)),
      )
      .finally(() => setLoading(false));
  }, []);

  return loading ? loader : table;
};

export default InnerList;
