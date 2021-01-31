const ora = require('ora');
const spinner = ora('');

const { handleVersionInput } = require('../common/input-helper');
const { putParameter } = require('../common/parameter-store-helper');
const { printHelp } = require('./help');

async function run(context, args) {
  process.env.AWS_SDK_LOAD_CONFIG = true;

  const inputParameters = handleVersionInput(context.input);

  if (!inputParameters.environment || inputParameters.environment.length === 0 ||
      !inputParameters.parameterValue || inputParameters.parameterValue.length === 0) {
    context.print.error('[Error] Need environment and version parameters');
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
    context.print.info(`Will update version value for environment ${inputParameters.environment} to ${inputParameters.parameterValue} on ${parameterName}...`);
    spinner.start(`Updating...`);

    const parameterVersion = await putParameter(configuredAWSClient, parameterName, inputParameters.parameterValue);

    spinner.succeed('Version parameter updated successfully.');

    context.print.info(`Parameter ${parameterName} was changed ${parameterVersion} times.`);

  } catch (error) {
    spinner.fail(`There was an error putting version parameter: ${error}`);
    throw error;
  }
}

module.exports = {
  run,
};
