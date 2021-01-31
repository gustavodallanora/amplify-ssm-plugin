function handleVersionInput(input) {
  if (!input.subCommands) {
    return {};
  }
  return {
    environment: input.subCommands[0],
    parameterValue: input.subCommands[1]
  };
};

function handleGetInput(input) {
  if (!input.subCommands) {
    return {};
  }
  return {
    parameterName: input.subCommands[0]
  };
};

function handlePutInput(input) {
  if (!input.subCommands || input.subCommands.length !== 2) {
    return {};
  }
  return {
    parameterName: input.subCommands[0],
    parameterValue: input.subCommands[1]
  };
};

module.exports = {
  handleVersionInput,
  handleGetInput,
  handlePutInput
};
