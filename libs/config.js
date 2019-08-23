const low = require( 'lowdb' );
const FileSync = require( 'lowdb/adapters/FileSync' );

const adapter = new FileSync( __dirname + '/../config.json' );
const config = low( adapter );

config.defaults( {
	webserver: {
		http: {
			enabled: true,
			host: "0.0.0.0",
			port: 80
		},
		https: {
			enabled: false,
			host: "0.0.0.0",
			port: 443,
			cert: "cert.cert",
			key: "key.key"
		},
		app: {
			owner: '',
			email: ''
		}
	}
} ).write();

module.exports = config;