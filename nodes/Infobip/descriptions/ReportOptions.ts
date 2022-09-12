import { INodeProperties } from 'n8n-workflow';

export const reportOptions: INodeProperties[] = [
	{
		displayName: 'Bulk ID',
		name: 'bulkId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['report'],
			},
		},
		default: '',
		description: 'Bulk ID to retrieve report for',
	},
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['report'],
			},
		},
		default: '',
		description: 'Message ID to retrieve report for',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['report', 'receive'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
];
