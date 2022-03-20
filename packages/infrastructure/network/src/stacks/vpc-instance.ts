import * as cdk from '@aws-cdk/core';
import * as ssm from '@aws-cdk/aws-ssm';
import * as ec2 from '@aws-cdk/aws-ec2';

export class VpcInstance extends ec2.Vpc {
  public privateSecurityGroup: ec2.SecurityGroup;
  public publicSecurityGroup: ec2.SecurityGroup;
  public rdsSecurityGroup: ec2.SecurityGroup;

  constructor(scope: cdk.Construct, id: string, context: { stage: string }) {
    super(scope, id, {
      cidr: '10.0.0.0/16',
      maxAzs: 2,
      natGateways: 0,
      subnetConfiguration: [
        {
          cidrMask: 23,
          name: 'app-subnet',
          subnetType: ec2.SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'elc-redis-cluster-subnet',
          subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        },
        {
          cidrMask: 24,
          name: 'rds-subnet',
          subnetType: ec2.SubnetType.PUBLIC,
        },
      ],
    });

    this.privateSecurityGroup = new ec2.SecurityGroup(this, `${id}-private-security-group`, {
      vpc: this,
      securityGroupName: `${id}-private-security-group`,
    });

    this.publicSecurityGroup = new ec2.SecurityGroup(this, `${id}-public-security-group`, {
      vpc: this,
      securityGroupName: `${id}-public-security-group`,
    });

    this.rdsSecurityGroup = new ec2.SecurityGroup(this, `${id}-rds-security-group`, {
      vpc: this,
      securityGroupName: `${id}-rds-security-group`,
    });

    const appSubnetSelection = this.selectSubnets({
      subnetGroupName: 'app-subnet',
    });

    new ssm.StringListParameter(scope, `${context.stage}-ssm-parameter-vpc-app-subnet-ids`, {
      stringListValue: appSubnetSelection.subnetIds,
      parameterName: `/rr-api/${context.stage}/global/VPC_APP_SUBNET_IDS`,
    });

    new ssm.StringParameter(scope, `${context.stage}-ssm-parameter-vpc-public-security-group-id`, {
      stringValue: this.publicSecurityGroup.securityGroupId,
      parameterName: `/rr-api/${context.stage}/global/VPC_PUBLIC_SECURITY_GROUP_ID`,
    });

    new ssm.StringParameter(scope, `${context.stage}-ssm-parameter-vpc-private-security-group-id`, {
      stringValue: this.privateSecurityGroup.securityGroupId,
      parameterName: `/rr-api/${context.stage}/global/VPC_PRIVATE_SECURITY_GROUP_ID`,
    });

    this.privateSecurityGroup.addIngressRule(this.privateSecurityGroup, ec2.Port.allTraffic(), 'Allow traffic from this security group');
    this.privateSecurityGroup.addIngressRule(this.publicSecurityGroup, ec2.Port.allTraffic(), 'Allow traffic from the public security group');

    this.publicSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(443), 'Allow all HTTPS traffic');
    this.publicSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(80), 'Allow all HTTP traffic');

    this.rdsSecurityGroup.addIngressRule(ec2.Peer.anyIpv4(), ec2.Port.tcp(5432), 'Allow all Postgres traffic');
  }
}
