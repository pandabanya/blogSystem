module.exports = {
  hooks: {
    readPackage(packageData) {
      packageData.pnpmApprovedBuilds = ['esbuild'];
      return packageData;
    },
  },
};