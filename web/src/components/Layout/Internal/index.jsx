import React, { useContext, useEffect } from 'react';
import { useApiRap } from '~/hooks';
import { Context } from '~/components/Store';
import Header from '~/components/Header/Index';
import { Content, Main } from './styles';

const handleSuccess = (key, res, formatter, dispatch) => {
  const data = {};
  data[key] = formatter(res.data);
  dispatch({ type: 'SET_STATUS', payload: data.status });
};

const Layout = ({ children }) => {
  const dispatch = useContext(Context)[1];
  const apiRap = useApiRap();

  useEffect(() => {
    apiRap.then(api => {
      api.requests
        .getStatus()
        .then(res =>
          handleSuccess('status', res, api.formatters.status, dispatch),
        );
    });
  }, []);
  return (
    <Content>
      <Header title={process.env.REACT_APP_WEBSITE_NAME} />
      <Main>{children}</Main>
    </Content>
  );
};

export default Layout;
