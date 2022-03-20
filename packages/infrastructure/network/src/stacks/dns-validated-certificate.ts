import * as cdk from '@aws-cdk/core';
import * as certificatemanager from '@aws-cdk/aws-certificatemanager';
import * as route53 from '@aws-cdk/aws-route53';

interface DnsValidatedCertificateProps {
  domainName: string;
  hostedZone: route53.IHostedZone;
}

export class DnsValidatedCertificate extends certificatemanager.DnsValidatedCertificate {
  constructor(scope: cdk.Construct, id: string, context: { stage: string }, { domainName, hostedZone }: DnsValidatedCertificateProps) {
    super(scope, id, {
      domainName,
      subjectAlternativeNames: [`*.${domainName}`],
      hostedZone,
    });
  }
}
