

module.exports = {
    preset: 'ts-jest',
    // globals: {
    //     'ts-jest': {
    //         tsconfig: '<rootDir>/tsconfig.json',
    //         diagnostics: false,
    //     },
    // },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    roots: ['<rootDir>/src'],
    testPathIgnorePatterns: ['/node_modules/', '/lib/'],
    // testMatch: ['**/__tests__/**/*.test.(ts|js)'],
    testEnvironment: 'node',
    collectCoverageFrom: [
        '<rootDir>/src/**/*.ts', // include all files, even files that have no tests yet (or are never called)
    ]
};