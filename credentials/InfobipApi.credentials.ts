import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class InfobipApi implements ICredentialType {
	name = 'infobipApi';
	displayName = 'Infobip API';
	documentationUrl = 'https://github.com/one-acre-fund/n8n-nodes-infobip';
	properties: INodeProperties[] = [
		{
			displayName:
				'Base URL (e.g. https://p123l.api.infobip.com/ - see https://www.infobip.com/docs/api)',
			name: 'URL',
			type: 'string',
			default: '',
		},
		{
			displayName: 'API Key (get it from https://portal.infobip.com/settings/accounts/api-keys)',
			name: 'token',
			type: 'string',
			default: '',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.URL}}',
			url: '/account/1/balance',
			json: true,
		},
	};

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"App " + $credentials.token}}',
			},
		},
	};
}
