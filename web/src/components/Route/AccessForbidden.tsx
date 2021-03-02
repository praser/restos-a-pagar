import React from 'react';
import Error from 'pages/Error';

const AccessForbidden = () => (
  <Error
    code={401}
    description="Você não pode acessar essa página"
    paragraph="Há uma diferença entre conhecer o caminho e percorrer o caminho."
  />
);

export default AccessForbidden;
