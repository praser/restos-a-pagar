import * as defaults from './defaults';
import * as formatters from './formatters';
import Requests from './requests';

const useApiRap = async () => {
  const requests = await Requests();
  return {
    requests,
    defaults,
    formatters,
  };
};

export default useApiRap;
