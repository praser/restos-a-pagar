export const unidade = ({
  physicalLotationId,
  physicalLotationAbbreviation,
  role,
}) => {
  const value = role === 'attendance' ? physicalLotationId : null;
  const label =
    role === 'attendance'
      ? physicalLotationAbbreviation
      : 'Todas as GIGOV/REGOV';
  return { value, label };
};

export const gestor = { value: null, label: 'Todos os gestores' };

export const tipoInfo = {
  value: 3,
  label: 'Operações que ainda não cumpriram os critérios de desbloqueio',
};
