import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import { getConfig } from './config';

export class HostedZone extends cdk.Construct {
  public hostedZone: route53.IHostedZone;

  constructor(scope: cdk.Construct, id: string, context: { stage: string }, { domainName }: { domainName: string }) {
    super(scope, id);

    const isProduction = context.stage === 'production';
    this.hostedZone = isProduction ? route53.HostedZone.fromLookup(this, id, { domainName }) : new route53.HostedZone(this, id, { zoneName: domainName });

    if (!isProduction) {
      // If this is not production, create a NS record in the root hosted zone
      const config = getConfig(context.stage);
      const rootHostedZone = route53.HostedZone.fromLookup(this, `${context.stage}-root-hosted-zone`, { domainName: config.rootHostedZone });

      new route53.ZoneDelegationRecord(this, `${id}-root-domain-zone-record`, {
        zone: rootHostedZone,
        recordName: domainName,
        nameServers: this.hostedZone.hostedZoneNameServers,
      });
    }
  }
}
