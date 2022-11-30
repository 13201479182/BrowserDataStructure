import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    transform: {
        '\\.ts$': 'ts-jest',
    },
    collectCoverage: true,
};

export default config;
