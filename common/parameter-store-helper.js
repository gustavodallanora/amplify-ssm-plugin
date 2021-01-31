async function getParameter(configuredAWSClient, parameterName) {
  const ssm = new configuredAWSClient.SSM();

  const params = {
    Name: parameterName,
    WithDecryption: false
  };

    const data = await ssm.getParameter(params).promise();
    return data.Parameter.Value;
};

async function putParameter(configuredAWSClient, parameterName, parameterValue) {
  const ssm = new configuredAWSClient.SSM();

  const params = {
    Name: parameterName,
    Value: parameterValue,
    DataType: 'text',
    Overwrite: true,
    Type: 'String',
    Tier: 'Standard'
  };

    const data = await ssm.putParameter(params).promise();
    return data.Version;
};

module.exports = {
  getParameter,
  putParameter
};
