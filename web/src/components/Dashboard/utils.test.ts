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

    it('is expected to return a path when called with valid budgetYear and lockDate', () => {
      const expected = '/safras/2020/bloqueios';
      const subject = getLink(props);
      expect(subject).toBe(expected);
    });
  });
});
