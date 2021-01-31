const ora = require('ora');
const spinner = ora('');

const { handleGetInput } = require('../common/input-helper');
const { getParameter } = require('../common/parameter-store-helper');
const { printHelp } = require('./help');

async function run(context, args) {
  process.env.AWS_SDK_LOAD_CONFIG = true;

  const inputParameters = handleGetInput(context.input);

  if (!inputParameters.parameterName || inputParameters.parameterName.length === 0) {
    context.print.error('[Error] Parameter name missing');
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
    context.print.info(`Will get current value for ${inputParameters.parameterName}...`);
    spinner.start(`Fetching ...`);

    const parameterValue = await getParameter(configuredAWSClient, inputParameters.parameterName);

    spinner.succeed('Parameter retrieved successfully.');

    context.print.info(`The current value for ${inputParameters.parameterName} on Parameter Store is ${parameterValue}.`);

  } catch (error) {
    spinner.fail(`There was an error getting ${inputParameters.parameterName} parameter: ${error}`);
    throw error;
  }
}

module.exports = {
  run,
};
