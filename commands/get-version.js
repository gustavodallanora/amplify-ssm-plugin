const ora = require('ora');
const spinner = ora('');

const { handleVersionInput } = require('../common/input-helper');
const { getParameter } = require('../common/parameter-store-helper');
const { printHelp } = require('./help');

async function run(context, args) {
  process.env.AWS_SDK_LOAD_CONFIG = true;

  const inputParameters = handleVersionInput(context.input);

  if (!inputParameters.environment || inputParameters.environment.length === 0) {
    context.print.error('[Error] Environment parameter missing');
    context.print.info('');
    printHelp(context);
    return;
  }

  const providerPlugins = context.amplify.getProviderPlugins(context);
  // eslint-disable-next-line dot-notation
  const provider = require(providerPlugins['awscloudformation']);
  const { getConfiguredAWSClient } = provider;
  const awssdk = await getConfiguredAWSClient(context);
  const configuredAWSClient = await awssdk.configureWithCreds(context);

  try {
    const parameterName = `/${inputParameters.environment}/frontend/version`;
    context.print.info(`Will get version value for environment ${inputParameters.environment} on ${parameterName}...`);
    spinner.start(`Fetching ...`);

    const parameterValue = await getParameter(configuredAWSClient, parameterName);

    spinner.succeed('Version parameter retrieved successfully.');

    context.print.info(`The current frontend version for ${inputParameters.environment} on Parameter Store is ${parameterValue}.`);

  } catch (error) {
    spinner.fail(`There was an error getting version parameter: ${error}`);
    throw error;
  }
}

module.exports = {
  run,
};
