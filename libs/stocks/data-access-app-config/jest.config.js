module.exports = {
  name: 'data-access-app-config',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/stocks/data-access-app-config',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
