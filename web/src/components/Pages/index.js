import UpdateCommitment from '~/components/Pages/Commitment';
import Error from '~/components/Pages/Error';
import {
  Create as JudicialInjunctionCreate,
  List as JudicialInjunctionList,
} from '~/components/Pages/JudicialInjunction';
import {
  List as UgList,
  Create as UgCreate,
  Update as UgUpdate,
} from '~/components/Pages/Ugs';
import { Create as UnlockCreate } from '~/components/Pages/Unlocks';
import Cancellations from '~/components/Pages/Dashboards/Cancellations';
import Locks from '~/components/Pages/Dashboards/Locks';
import PossibleLocks from '~/components/Pages/Dashboards/PossibleLocks';

export {
  Cancellations,
  Error,
  JudicialInjunctionCreate,
  JudicialInjunctionList,
  Locks,
  PossibleLocks,
  UgCreate,
  UgList,
  UgUpdate,
  UpdateCommitment,
  UnlockCreate,
};
