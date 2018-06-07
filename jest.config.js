module.exports = {
    testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
    collectCoverage: false,
    coverageReporters: ["text", "html"],
    setupTestFrameworkScriptFile: "<rootDir>/enzymeSetup.js",
    snapshotSerializers: ["enzyme-to-json/serializer"]
}