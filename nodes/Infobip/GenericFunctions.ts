import { IExecuteFunctions, ILoadOptionsFunctions } from 'n8n-core';

import { IDataObject, IHookFunctions, IHttpRequestOptions, IWebhookFunctions } from 'n8n-workflow';

import * as _ from 'lodash';

export async function infobipApiRequest(
	this: IExecuteFunctions | IWebhookFunctions | IHookFunctions | ILoadOptionsFunctions,
	option: IDataObject = {},
	// tslint:disable:no-any
): Promise<any> {
	const credentials = (await this.getCredentials('infobipApi')) as IDataObject;

	const options: IHttpRequestOptions = {
		url: '',
		headers: {
			Accept: 'application/json',
			Authorization: `App ${credentials.token}`,
		},
		json: true,
	};
	if (Object.keys(option)) {
		Object.assign(options, option);
	}
	if (options.url && !/^http(s)?:/.test(options.url)) {
		options.url = credentials.URL + options.url;
	}

	const response = await this.helpers.httpRequest(options);
	return response;
}

export function parseStringList(value: string): string[] {
	return _.split(_.toString(value), /[\s,]+/);
}
