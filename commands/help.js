async function printHelp(context) {
  context.print.info('**This is an experimental version, DO NOT USE IT IN PRODUCTION environments just yet.**');
  context.print.info(' ');
  context.print.info('# To get current frontend version');
  context.print.info('  amplify amplify-ssm-plugin get-version <ENVIRONMENT>');
  context.print.info(' ');
  context.print.info('# To update frontend version');
  context.print.info('  amplify amplify-ssm-plugin put-version <ENVIRONMENT> <VERSION>');
  context.print.info(' ');
  context.print.info('# To put the value `bar` on the parameter `foo`');
  context.print.info('  amplify amplify-ssm-plugin put-parameter foo bar');
  context.print.info(' ');
  context.print.info('# To get the value of the parameter `foo`');
  context.print.info('  amplify amplify-ssm-plugin get-parameter foo');
  context.print.info(' ');
  context.print.info('For more information go to: https://github.com/gustavodallanora/amplify-ssm-plugin');
};

async function run(context) {
  await printHelp(context);

};

module.exports = {
  run,
  printHelp
};
