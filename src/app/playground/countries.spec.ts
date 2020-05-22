import {countries} from './countries';

describe('countries', () => {
  it('should include countries in return arrow', () => {
    const result = countries();

    expect(result).toContain('UA');
    expect(result).toContain('RU');
    expect(result).toContain('BY');
  });
});
