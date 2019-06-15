var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var FreelanceHub = artifacts.require("./FreelanceHub.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(FreelanceHub);
};
