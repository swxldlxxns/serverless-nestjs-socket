module.exports.profile = () => `profile_${this.stage()}`;
module.exports.region = () => 'us-east-1';
module.exports.stage = () => 'dev';
module.exports.nodePath = () => './:/opt/node_modules';
module.exports.stackName = () => 'serverless-nestjs-socket';
module.exports.domainName = () => `ws-${this.stage()}.domain.com`;
module.exports.logRetentionInDays = () => 14;
