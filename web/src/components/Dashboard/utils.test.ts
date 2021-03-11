import IProps from './IProps';
import { getLink } from './utils';

describe('Dashboard utils', () => {
  describe('getLink', () => {
    let props: IProps;
    beforeEach(() => {
      props = {
        anoOrcamentario: 2020,
        dataBloqueio: ' 2020-11-14 19:48:43.000',
      };
    });

    it('is expected to return a path to locks when called with lockDate in the past', () => {
      const expected = `/safras/${props.anoOrcamentario}/bloqueios`;
      const subject = getLink(props);
      expect(subject).toBe(expected);
    });

    it('is expected to return a path to possible locks when called with da lockDate in the future', () => {
      props.dataBloqueio = '2021-11-15';
      const expected = `/safras/${props.anoOrcamentario}/previa-bloqueio`;
      const subject = getLink(props);
      expect(subject).toBe(expected);
    });
  });
});
