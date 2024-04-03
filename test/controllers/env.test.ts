import { EnvController } from '@/controllers/envController';

jest.mock('@/controllers/envController', () => {
  const originalModule = jest.requireActual('@/controllers/envController');
  return {
    EnvController: {
      ...originalModule.EnvController,
      get envName() {
        return 'TEST';
      },
    },
  };
});

describe('EnvController', () => {
  test('it should return environment name', () => {
    // GIVEN
    const expectedEnvName = 'TEST';
    // WHEN
    const actualEnvName = EnvController.envName;
    // THEN
    expect(actualEnvName).toBe(expectedEnvName);
  });
});
