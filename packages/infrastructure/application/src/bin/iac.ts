#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { NetworkStack } from '@swann-stack/network-infrastructure';
import { PersistenceStack } from '@swann-stack/persistence-infrastructure';
import { ApplicationStack } from '../stacks/application-stack';

const app = new cdk.App();

const stage: string = app.node.tryGetContext('stage');
const networkStackName = `${stage}-network-infrastructure`;
const persistenceStackName = `${stage}-persistence-infrastructure`;
const applicationStackName = `${stage}-application-infrastructure`;

if (!stage) {
  throw Error('stage must be provided');
}

const context = {
  stage,
  awsRegion: process.env.AWS_DEFAULT_REGION || 'us-east-1',
  awsAccountId: process.env.AWS_ACCOUNT_ID,
};

console.log(`Deploying infrastructure on stack ${applicationStackName}`);
console.log(`Using context:`, context);

const networkStack = new NetworkStack(app, networkStackName, context);
const persistenceStack = new PersistenceStack(app, persistenceStackName, context);
const applicationStack = new ApplicationStack(app, applicationStackName, context);

persistenceStack.node.addDependency(networkStack);
applicationStack.node.addDependency(networkStack);
applicationStack.node.addDependency(persistenceStack);
