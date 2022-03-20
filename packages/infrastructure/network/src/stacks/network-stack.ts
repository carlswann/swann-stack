import * as cdk from '@aws-cdk/core';
import * as route53 from '@aws-cdk/aws-route53';
import * as ssm from '@aws-cdk/aws-ssm';

import { HostedZone } from './hosted-zone';
import { getConfig } from './config';
import { DnsValidatedCertificate } from './dns-validated-certificate';
import { VpcInstance } from './vpc-instance';
import { WebsocketApi } from './websocket-api';

export class NetworkStack extends cdk.Stack {
  public vpcInstance: VpcInstance;
  public certificate: DnsValidatedCertificate;
  public hostedZone: HostedZone;

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
    const config = getConfig(context.stage);

    this.hostedZone = new HostedZone(this, `${context.stage}-hosted-zone`, context, { domainName: config.domainName });
    this.certificate = new DnsValidatedCertificate(this, 'certificate', context, { domainName: config.domainName, hostedZone: this.hostedZone.hostedZone });

    //Create new VPC for app services to run in
    this.vpcInstance = new VpcInstance(this, `${context.stage}-vpc`, context);

    const websocketApi = new WebsocketApi(this, `${context.stage}-websocket-api`, context, {
      certificate: this.certificate,
    });

    new route53.ARecord(this, `${context.stage}-route-53-api-gateway-ws-a-record`, {
      zone: this.hostedZone.hostedZone,
      recordName: config.websocketApiPrefix,
      target: route53.RecordTarget.fromAlias({
        bind: (): route53.AliasRecordTargetConfig => ({
          dnsName: websocketApi.domainName.attrRegionalDomainName,
          hostedZoneId: websocketApi.domainName.attrRegionalHostedZoneId,
        }),
      }),
    });

    new ssm.StringParameter(this, `${context.stage}-api-url`, {
      stringValue: `https://${config.apiUrl}`,
      parameterName: `/rr-api/${context.stage}/global/API_URL`,
    });
  }
}
