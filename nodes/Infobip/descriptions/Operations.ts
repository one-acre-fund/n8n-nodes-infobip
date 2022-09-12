import { INodeProperties } from 'n8n-workflow';

export const operations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sms'],
			},
		},
		options: [
			{
				name: 'Dequeue Delivery Report',
				value: 'report',
				description:
					'Get and dequeue delivery status for a given message or bulk. NOTE: Will only return reports that arrived since the last API request in the last 48 hours!.',
				action: 'Dequeue SMS delivery report',
			},
			{
				name: 'Dequeue Received Messages',
				value: 'receive',
				description:
					'Fetch and dequeue incoming SMS messages. NOTE: Will only return messages that arrived since the last API request!.',
				action: 'Dequeue received SMS messages',
			},
			{
				name: 'Get Scheduled Messages',
				value: 'scheduled',
				description: 'See the status and the scheduled time of your SMS messages',
				action: 'Get scheduled SMS messages',
			},
			{
				name: 'Get Scheduled Messages Status',
				value: 'scheduledStatus',
				description: 'See the status of your scheduled SMS messages',
				action: 'Get scheduled SMS messages status',
			},
			{
				name: 'Search Logs',
				value: 'log',
				description: 'Get outbound message logs for given search parameters',
				action: 'Search SMS logs',
			},
			{
				name: 'Send',
				value: 'send',
				description: 'Send SMS(es)',
				action: 'Send SMS',
			},
		],
		default: 'send',
	},
];
