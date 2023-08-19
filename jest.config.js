module.exports = {
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest",
  },
  testMatch: ['<rootDir>/__tests__/**/*.(test|spec).(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: ["<rootDir>/cypress/"],

  // setupFilesAfterEnv: ["./setupTests.js"],
  // setupFilesAfterEnv: ['jest-extended',  '@testing-library/jest-dom/extend-expect'],
  // setupFilesAfterEnv: ['jest-extended',  '@testing-library/jest-dom'],
  setupFilesAfterEnv: ['jest-extended'],
  
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js",
  },
  testEnvironment: "jsdom",
  // testEnvironment: "node",
  transformIgnorePatterns: ["node_modules/(?!axios)"],
};
