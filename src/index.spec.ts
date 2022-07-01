import { equal } from 'assert';
import { APIProvider } from './provider';
import { PyroCore } from './';

describe('pyrolib tests', () => {
  const network = 'MainNet';
  const provider = new APIProvider(network);
  const core = new PyroCore(provider);
  it('should get PYRO as the symbol', async () => {
    const symbol = await core.symbol();
    equal('PYRO', symbol);
  }).timeout(10000);
  it('should get PyroPets as the name', async () => {
    const name = await core.name();
    equal('PyroPets', name);
  }).timeout(10000);
  it('should get 16384 as the gen0 cap', async () => {
    const cap = await core.gen0Cap();
    equal(BigInt(16384), cap);
  }).timeout(10000);
});
