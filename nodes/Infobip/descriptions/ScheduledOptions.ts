import { INodeProperties } from 'n8n-workflow';

export const scheduledOptions: INodeProperties[] = [
	{
		displayName: 'Bulk ID',
		name: 'bulkId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['scheduled', 'scheduledStatus'],
			},
		},
		default: '',
		description: 'Bulk ID to fetch status of',
	},
];
