import Cancellations from '~/components/Pages/Dashboards/Cancellations';
import UpdateCommitment from '~/components/Pages/Commitment';
import Error from '~/components/Pages/Error';
import Login from '~/components/Pages/Login';
import Locks from '~/components/Pages/Dashboards/Locks';
import PossibleLocks from '~/components/Pages/Dashboards/PossibleLocks';
import {
  List as UgList,
  Create as UgCreate,
  Update as UgUpdate,
} from '~/components/Pages/Ugs';
import { Create as UnlockCreate } from '~/components/Pages/Unlocks';
import { Create as JudicialInjunctionCreate } from '~/components/Pages/JudicialInjunction';

export {
  Cancellations,
  Error,
  JudicialInjunctionCreate,
  Login,
  Locks,
  PossibleLocks,
  UgCreate,
  UgList,
  UgUpdate,
  UpdateCommitment,
  UnlockCreate,
};
