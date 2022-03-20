import * as cdk from '@aws-cdk/core';

export class ApplicationStack extends cdk.Stack {
  constructor(
    scope: cdk.App,
    id: string,
    context: {
      stage: string;
      awsRegion: string;
      awsAccountId: string;
    }
  ) {
    super(scope, id, { env: { region: context.awsRegion, account: context.awsAccountId } });
  }
}
