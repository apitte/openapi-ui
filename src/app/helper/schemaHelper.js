import first from "lodash/first";
import get from "lodash/get";

/**
 * Gets the first part of schema
 *
 * @param schema
 * @returns {string}
 */
export function getBasePath(schema) {
	return schema.basePath ? schema.basePath : "";
}

/**
 * Get the address of first server
 *
 * @param schema
 * @returns {string}
 */
export function getFirstServerUrl(schema) {
	if (schema.servers && schema.servers.length > 0) {
		return schema.servers[0].url;
	} else {
		return "";
	}
}

export function getServers(schema) {
	if (schema.servers && schema.servers.length > 0) {
		return [...schema.servers.map(s => s.url), ""];
	} else {
		return "";
	}
}

/**
 * Get the reference object in swagger io schema
 *
 * @param obj
 * @param {string} ref
 * @param defaultObject
 */
function getRef(obj, ref, defaultObject) {
	return get(obj, ref.substr(1).replaceAll("/", ","), defaultObject);
}

function hasParams(schema, method, url) {
	method = method.toLowerCase();
	return schema && schema.paths
		&& schema.paths[url]
		&& schema.paths[url][method]
		&& schema.paths[url][method].parameters
		&& Array.isArray(schema.paths[url][method].parameters);
}

export function getRequestBody(schema, method, url) {
	if (hasParams(schema, method, url)) {
		const param = first(schema.paths[url][method].parameters.filter(p => p.in === "body"));

		return JSON.stringify(param);
	}
	return "";
}

export function getPathParams(schema, method, url) {
	method = method.toLowerCase();
	if (hasParams(schema, method, url)) {
		return schema.paths[url][method].parameters.filter(p => p.in === "path");
	}
	return [];
}