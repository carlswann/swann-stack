import * as cdk from '@aws-cdk/core';
import * as ssm from '@aws-cdk/aws-ssm';
import * as sqs from '@aws-cdk/aws-sqs';

export class PersistenceStack extends cdk.Stack {
  public workerSqsQueue: sqs.Queue;

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

    const workerSqsDeadLetterQueue = new sqs.Queue(this, `${context.stage}-worker-sqs-dead-letter-queue`, {
      queueName: `swann-stack-${context.stage}-worker-dead-letter-queue`,
      deliveryDelay: cdk.Duration.seconds(0),
      retentionPeriod: cdk.Duration.days(14),
      visibilityTimeout: cdk.Duration.minutes(5),
    });

    this.workerSqsQueue = new sqs.Queue(this, `${context.stage}-worker-sqs-queue`, {
      queueName: `swann-stack-${context.stage}-worker-queue`,
      deadLetterQueue: {
        maxReceiveCount: 3,
        queue: workerSqsDeadLetterQueue,
      },
      deliveryDelay: cdk.Duration.seconds(0),
      retentionPeriod: cdk.Duration.days(14),
      visibilityTimeout: cdk.Duration.minutes(5),
    });

    new ssm.StringParameter(this, `${context.stage}-ssm-parameter-sqs-workekr-queue-url`, {
      stringValue: this.workerSqsQueue.queueUrl,
      parameterName: `/rr-api/${context.stage}/global/WORKER_SQS_QUEUE_URL`,
    });

    new ssm.StringParameter(this, `${context.stage}-ssm-parameter-sqs-workekr-queue-arn`, {
      stringValue: this.workerSqsQueue.queueArn,
      parameterName: `/rr-api/${context.stage}/global/WORKER_SQS_QUEUE_ARN`,
    });
  }
}
