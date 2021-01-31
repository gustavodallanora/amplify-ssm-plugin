const ora = require('ora');
const spinner = ora('');

const { handlePutInput } = require('../common/input-helper');
const { putParameter } = require('../common/parameter-store-helper');
const { printHelp } = require('./help');

async function run(context, args) {
  process.env.AWS_SDK_LOAD_CONFIG = true;

  const inputParameters = handlePutInput(context.input);

  if (!inputParameters.parameterName || inputParameters.parameterName.length === 0 ||
      !inputParameters.parameterValue || inputParameters.parameterValue.length === 0) {
    context.print.error('[Error] Need parameter name and value parameters');
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
    context.print.info(`Will update value for ${inputParameters.parameterName} to ${inputParameters.parameterValue}...`);
    spinner.start(`Updating...`);

    const parameterVersion = await putParameter(configuredAWSClient, inputParameters.parameterName, inputParameters.parameterValue);

    spinner.succeed('Parameter updated successfully.');

    context.print.info(`Parameter ${inputParameters.parameterName} was changed ${parameterVersion} times.`);

  } catch (error) {
    spinner.fail(`There was an error putting parameter ${inputParameters.parameterName}: ${error}`);
    throw error;
  }
}

module.exports = {
  run,
};
