/**
 * @module util/environment
 */

/**
 * The map of application environments.
 * @readonly
 * @type  {Object}
 */
export const environment = {
  development: 'development',
  production: 'production',
  test: 'test',
};

/**
 * Indicates whether the application is in the given environment.
 * @param   {string}  env The application environment.
 * @returns {boolean}
 */
export function isEnvironment(env) {
  return process.env.NODE_ENV === env;
}
