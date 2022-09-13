module.exports = {
  "testEnvironment": "jsdom",
  "moduleNameMapper": {
    "^.+\\.(css|less|scss)$": "babel-jest"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!src/types/*',
    '!src/index.ts',
    '!src/cities.ts',
    '!src/towns.ts',
    '!src/zips.ts'
  ]
}