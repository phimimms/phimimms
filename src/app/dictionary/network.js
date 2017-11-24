/**
 * @module dictionary/network
 */

const { protocol, hostname, port } = window.location;

export const defaultURL = `${protocol}//${hostname}:${port}/api`;
