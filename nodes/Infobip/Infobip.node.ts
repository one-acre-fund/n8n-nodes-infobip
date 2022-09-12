import { IExecuteFunctions } from 'n8n-core';

import { IDataObject, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';

import { infobipApiRequest, parseStringList } from './GenericFunctions';

import {
	logOptions,
	operations,
	reportOptions,
	scheduledOptions,
	smsAdvancedOptions,
	smsOptions,
} from './descriptions';

import * as _ from 'lodash';

export class Infobip implements INodeType {
	// eslint-disable-next-line n8n-nodes-base/node-class-description-missing-subtitle
	description: INodeTypeDescription = {
		displayName: 'Infobip',
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		documentationUrl: 'https://github.com/one-acre-fund/n8n-nodes-infobip',
		name: 'infobip',
		icon: 'file:infobip.svg',
		group: ['transform'],
		version: 1,
		description: 'Work with Infobip SMS and telecoms API',
		defaults: {
			name: 'Infobip',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'infobipApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'SMS',
						value: 'sms',
						description:
							'Use the SMS API - see docs at https://www.infobip.com/docs/api/channels/sms',
					},
				],
				default: 'sms',
				required: true,
			},
			...operations,
			...smsOptions,
			...smsAdvancedOptions,
			...logOptions,
			...scheduledOptions,
			...reportOptions,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// tslint:disable-next-line:no-any
		let returnData: any[] = [];
		// tslint:disable-next-line:no-any
		let responseData: any;
		const items = this.getInputData();
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0) as string;

		if (resource === 'sms') {
			// *********************************************************************
			//                             SMS
			// *********************************************************************

			if (operation === 'send') {
				// ----------------------------------
				//          Submissions: send
				// ----------------------------------

				// This operation works in batch mode, so we send all the input items together and return a single response
				const messages = [];
				for (let i = 0; i < items.length; i++) {
					const from = this.getNodeParameter('from', i) as string;
					const to = this.getNodeParameter('to', i) as string;
					const text = this.getNodeParameter('text', i) as string;
					const message: IDataObject = {
						from,
						text,
						destinations: parseStringList(to).map((to) => ({
							to,
						})),
					};

					const advancedOptions = this.getNodeParameter('advancedOptions', i) as IDataObject;

					// Directly assign all non-empty properties
					_.assign(
						message,
						_.pickBy(
							_.pick(advancedOptions, ['notifyUrl', 'callbackData', 'sendAt', 'transliteration']),
							_.identity,
						),
					);

					// Delivery window requires some parsing
					if (advancedOptions.deliveryTimeWindowDays) {
						_.set(
							message,
							'deliveryTimeWindow.days',
							advancedOptions.deliveryTimeWindowDays as string[],
						);

						if (advancedOptions.deliveryTimeWindowFrom && advancedOptions.deliveryTimeWindowTo) {
							const timeComponentsFrom = (advancedOptions.deliveryTimeWindowFrom as string)
								.split(':')
								.map(_.toNumber);
							const timeComponentsTo = (advancedOptions.deliveryTimeWindowTo as string)
								.split(':')
								.map(_.toNumber);

							_.set(message, 'deliveryTimeWindow.from', {
								hour: timeComponentsFrom[0],
								minute: timeComponentsFrom[1],
							});
							_.set(message, 'deliveryTimeWindow.to', {
								hour: timeComponentsTo[0],
								minute: timeComponentsTo[1],
							});
						}
					}

					// console.dir(message);
					messages.push(message);
				}

				returnData = await infobipApiRequest.call(this, {
					method: 'POST',
					url: `/sms/2/text/advanced`,
					body: {
						messages,
					},
				});
				return [this.helpers.returnJsonArray(returnData)];
			}
		}

		// Process non-bulk operations
		for (let i = 0; i < items.length; i++) {
			if (resource === 'sms') {
				if (operation === 'report') {
					// ----------------------------------
					//          SMS: report
					// ----------------------------------

					const bulkId = this.getNodeParameter('bulkId', i) as string;
					const messageId = this.getNodeParameter('messageId', i) as string;
					const limit = this.getNodeParameter('limit', i) as number;

					({ results: responseData } = await infobipApiRequest.call(this, {
						url: `/sms/1/reports`,
						qs: {
							...(bulkId && { bulkId }),
							...(messageId && { messageId }),
							...(limit && { limit }),
						},
					}));
				}

				if (operation === 'log') {
					// ----------------------------------
					//          SMS: logs
					// ----------------------------------

					const bulkId = this.getNodeParameter('bulkId', i) as string;
					const messageId = this.getNodeParameter('messageId', i) as string;

					const advancedSearch = this.getNodeParameter('advancedSearch', i) as string;

					({ results: responseData } = await infobipApiRequest.call(this, {
						url: `/sms/1/logs`,
						qs: {
							...(messageId && { messageId }),
							...(bulkId && { bulkId }),
							...(_.pickBy(advancedSearch, _.identity) as IDataObject),
						},
					}));
				}

				if (operation === 'scheduled') {
					// ----------------------------------
					//          SMS: scheduled
					// ----------------------------------

					const bulkId = this.getNodeParameter('bulkId', i) as string;

					responseData = [
						await infobipApiRequest.call(this, {
							url: `/sms/1/bulks`,
							qs: {
								bulkId,
							},
						}),
					];
				}

				if (operation === 'scheduledStatus') {
					// ----------------------------------
					//          SMS: scheduled Status
					// ----------------------------------

					const bulkId = this.getNodeParameter('bulkId', i) as string;

					responseData = [
						await infobipApiRequest.call(this, {
							url: `/sms/1/bulks/status`,
							qs: {
								bulkId,
							},
						}),
					];
				}

				if (operation === 'receive') {
					// ----------------------------------
					//          SMS: receive
					// ----------------------------------

					const limit = this.getNodeParameter('limit', i) as number;

					({ results: responseData } = await infobipApiRequest.call(this, {
						url: `/sms/1/inbox/reports`,
						qs: {
							limit,
						},
					}));
				}
			}

			returnData = returnData.concat(responseData);
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
