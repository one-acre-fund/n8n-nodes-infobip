import { INodeProperties } from 'n8n-workflow';

export const logOptions: INodeProperties[] = [
	{
		displayName: 'Bulk IDs',
		name: 'bulkId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['log'],
			},
		},
		default: '',
		description: 'Comma-separated list of bulk IDs to retrieve',
	},
	{
		displayName: 'Message IDs',
		name: 'messageId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['log'],
			},
		},
		default: '',
		description: 'Comma-separated list of message IDs to retrieve',
	},
	{
		displayName: 'Advanced Log Search Options',
		name: 'advancedSearch',
		type: 'collection',
		displayOptions: {
			show: {
				resource: ['sms'],
				operation: ['log'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'From',
				name: 'from',
				type: 'string',
				default: '',
				description: 'The sender ID which can be alphanumeric or numeric',
			},
			{
				displayName: 'To',
				name: 'to',
				type: 'string',
				default: '',
				description: 'Message destination address',
			},
			{
				displayName: 'Status',
				name: 'generalStatus',
				type: 'options',
				default: '',
				description: 'Sent message status',
				options: [
					{
						name: 'ACCEPTED',
						value: 'ACCEPTED',
					},
					{
						name: 'Any',
						value: '',
					},
					{
						name: 'DELIVERED',
						value: 'DELIVERED',
					},
					{
						name: 'EXPIRED',
						value: 'EXPIRED',
					},
					{
						name: 'PENDING',
						value: 'PENDING',
					},
					{
						name: 'REJECTED',
						value: 'REJECTED',
					},
					{
						name: 'UNDELIVERABLE',
						value: 'UNDELIVERABLE',
					},
				],
			},
			{
				displayName: 'Sent Since',
				name: 'sentSince',
				type: 'dateTime',
				default: '',
				description: 'Sets the lower limit on the date and time filter for sent messages',
			},
			{
				displayName: 'Sent Until',
				name: 'sentUntil',
				type: 'dateTime',
				default: '',
				description: 'Sets the upper limit on the date and time filter for sent messages',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Mobile Country Code',
				name: 'mcc',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Mobile Network Code',
				name: 'mnc',
				type: 'string',
				default: '',
			},
		],
	},
];
