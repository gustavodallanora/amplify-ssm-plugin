# Amplify SSM Plugin
> :warning: **This is an experimental version, DO NOT USE IT IN PRODUCTION environments just yet.**

This plugin implements some API calls to [AWS SSM Parameter Store](https://aws.amazon.com/systems-manager/features/#Parameter_Store).

It uses awscloudformation provider Configured AWS CLI to access your AWS resources.

The Main purpose is to allow developers to leverage their current [Amplify](https://aws.amazon.com/amplify/) configuration and interact with the Parameter Store and manage the version of the frontend application.

It is also possible to fetch and put any parameter from and to the parameter store. **Only supports string, non-encrypted, standard tier parameters**.

Before using this plugin you need:
* [Amplify Framework](https://aws.amazon.com/amplify/) properly installed and configured with awscloudformation provider fully functional.

# Install and Help

Install:
```bash
npm install -g amplify-ssm-plugin
amplify plugin add amplify-ssm-plugin
```

Help:
```bash
amplify amplify-ssm-plugin help
```

# Usage
## Frontend version

The frontend version parameter is stored in the Parameter Store following the syntax below:
```bash
/<ENVIRONMENT>/frontend/version
```
* `ENVIRONMENT` will be replaced by the environment being published, such as dev, prod.

### Get current frontend version

To get the current value of the frontend version parameter:
```bash
amplify amplify-ssm-plugin get-version <ENVIRONMENT>
```

Example:
```bash
amplify amplify-ssm-plugin get-version dev
```

This wil result in something like:
```console
$ amplify amplify-ssm-plugin get-version dev
✔ Version parameter retrieved successfully.
Current frontend version for dev on Parameter Store is 1.2.3.
```

### Update frontend version

To update the value of the frontend version parameter:
```bash
amplify amplify-ssm-plugin put-version <ENVIRONMENT> <VERSION>
```

Example:
```bash
amplify amplify-ssm-plugin put-version dev 1.2.4
```

This will result in something like:
```console
$ amplify amplify-ssm-plugin put-version dev 1.2.4
Will update version value for environment dev to 1.2.4 on /dev/frontend/version...
✔ Version parameter updated successfully.
Parameter /dev/frontend/version was changed 5 times.
```

## Other Parameters

You can also get and put any other string, non-encrypted, standard tier parameter using de `get-parameter` and `put-parameter` commands:

To put the value `bar` on the parameter `foo`:
```bash
amplify amplify-ssm-plugin put-parameter foo bar
```

To get the value of the parameter `foo`:
```bash
amplify amplify-ssm-plugin get-parameter foo
```

# License

This library is licensed under the MIT License.