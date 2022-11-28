import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    transform: {
        '\\.(ts|js)$': 'ts-jest',
    },
    collectCoverage: true,
};

export default config;
