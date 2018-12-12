/**
 * Configuration variable to start the server
 */

// Container for all environment
const environments = {}

// development environment
environments.development = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : "development"
}

module.exports = environments['development']