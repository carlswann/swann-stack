import * as apiGatewayV2 from '@aws-cdk/aws-apigatewayv2';
import * as cdk from '@aws-cdk/core';
import * as ssm from '@aws-cdk/aws-ssm';
import * as certificatemanager from '@aws-cdk/aws-certificatemanager';

import { getConfig } from './config';

interface WebsocketApiProps {
  certificate: certificatemanager.DnsValidatedCertificate;
}

export class WebsocketApi extends apiGatewayV2.WebSocketApi {
  public domainName: apiGatewayV2.CfnDomainName;

  constructor(scope: cdk.Construct, id: string, context: { stage: string }, { certificate }: WebsocketApiProps) {
    super(scope, id, {
      apiName: `${context.stage}-websocket-api`,
      routeSelectionExpression: 'Api.RouteSelectionExpression',
    });

    const config = getConfig(context.stage);

    // Setup Connect Route
    const connectIntegration = new apiGatewayV2.CfnIntegration(this, `${context.stage}-websocket-api-connect-integration-id`, {
      apiId: this.apiId,
      integrationType: 'HTTP_PROXY',
      integrationMethod: 'POST',
      integrationUri: `https://${config.apiUrl}/websocket-connections`,
      requestParameters: {
        'integration.request.header.connectionId': 'context.connectionId',
      },
    });

    // This thread helped a lot in setting up the connect route :: https://stackoverflow.com/questions/54643795/adding-integration-response-to-aws-websocket-api-with-cloudformation
    const connectionRoute = new apiGatewayV2.CfnRoute(this, `${context.stage}-websocket-api-connect-route-id`, {
      apiId: this.apiId,
      routeKey: '$connect',
      target: `integrations/${connectIntegration.ref}`,
      routeResponseSelectionExpression: '$default',
    });
    connectionRoute.addDependsOn(connectIntegration);

    // Setup Disconnect Route
    const disconnectRouteIntegration = new apiGatewayV2.CfnIntegration(this, `${context.stage}-websocket-api-disconnect-integration-id`, {
      apiId: this.apiId,
      integrationType: 'HTTP_PROXY',
      integrationMethod: 'DELETE',
      integrationUri: `https://${config.apiUrl}/websocket-connections`,
      requestParameters: {
        'integration.request.header.connectionId': 'context.connectionId',
      },
    });

    const disconnectRoute = new apiGatewayV2.CfnRoute(this, `${context.stage}-websocket-api-disconnect-route-id`, {
      apiId: this.apiId,
      routeKey: '$disconnect',
      target: `integrations/${disconnectRouteIntegration.ref}`,
    });
    disconnectRoute.addDependsOn(disconnectRouteIntegration);

    this.domainName = new apiGatewayV2.CfnDomainName(this, `${context.stage}-websocket-api-domain-id`, {
      domainName: config.websocketApiDomainName,
      domainNameConfigurations: [
        {
          certificateArn: certificate.certificateArn,
          endpointType: 'REGIONAL',
        },
      ],
    });

    // TODO :: Add Access log settings parameter here
    const apiStage = new apiGatewayV2.CfnStage(this, `${context.stage}-stage-id`, {
      stageName: context.stage,
      apiId: this.apiId,
      autoDeploy: true,
    });

    new apiGatewayV2.CfnApiMapping(this, `${context.stage}-websocket-api-mapping`, {
      apiId: this.apiId,
      domainName: config.websocketApiDomainName,
      stage: apiStage.ref,
    });

    new ssm.StringParameter(this, `${context.stage}-ssm-parameter-websocket-api-id`, {
      stringValue: this.apiId,
      parameterName: `/rr-api/${context.stage}/global/WEBSOCKET_API_ID`,
    });

    new ssm.StringParameter(this, `${context.stage}-ssm-parameter-websocket-api-endpoint`, {
      stringValue: `https://${config.websocketApiDomainName}`,
      parameterName: `/rr-api/${context.stage}/global/WEBSOCKET_API_ENDPOINT`,
    });
  }
}
