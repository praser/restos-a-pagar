import React, {
  createContext,
  DispatchWithoutAction,
  FC,
  useReducer,
} from 'react';
import Reducer from './Reducer';

interface IAlert {
  visible: boolean;
  title: string;
  text: string;
}

interface IParams {
  dataBloqueio: Date | null;
  dataCancelamento: Date | null;
}

interface IStatus {
  databaseLastUpdate: Date | null;
  databasePosition: Date | null;
}

interface IContext {
  jwt: string | null;
  loading: boolean;
  alert: IAlert;
  params: IParams[];
  status: IStatus;
}

const initialState: IContext = {
  jwt: null,
  loading: false,
  alert: {
    visible: false,
    title: '',
    text: '',
  },
  params: [
    {
      dataBloqueio: null,
      dataCancelamento: null,
    },
  ],
  status: {
    databaseLastUpdate: null,
    databasePosition: null,
  },
};

type IContextProviderValue = [IContext, DispatchWithoutAction | null];

interface IStoreProps {
  children: FC;
}

const Context = createContext<IContextProviderValue>([initialState, null]);

const Store = ({ children }: IStoreProps) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export { Store as default, Context };
