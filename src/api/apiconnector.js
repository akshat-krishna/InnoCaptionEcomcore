import ServerUrl from '../lib/serverurl';
import ApiUtils from './apiutils';

const sendRequest = (relativeUrl, successHandler, errorHandler) => {
	let url = ServerUrl.BASE_URL + relativeUrl;
	fetch(url)
	.then(ApiUtils.statusHandler)
	.then(ApiUtils.jsonHandler)
	.then(successHandler)
	.catch(errorHandler);
};

const ApiConnector = {
	sendRequest: sendRequest
};

export default ApiConnector;