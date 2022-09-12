import { INodeProperties } from 'n8n-workflow';

export const smsOptions: INodeProperties[] = [
	{
		displayName: 'Message',
		name: 'text',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['send'],
			},
		},
		default: '',
		description: 'Content of the message being sent',
	},
	{
		displayName: 'From',
		name: 'from',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['send'],
			},
		},
		default: '',
		description: 'The sender ID which can be alphanumeric or numeric (e.g. CompanyName)',
	},
	{
		displayName: 'To',
		name: 'to',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['send'],
			},
		},
		default: '',
		description:
			'Comma-separated message destination addresses. Phone numbers must include the country code, but not the international dialing prefix (00/+) - Example: 41793026727.',
	},
];
