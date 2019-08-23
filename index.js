const chalk = require( 'chalk' );
const config = require( __dirname + '/libs/config.js' );

function setupHTTPServer() {
	const http = require( 'http' );
	const app = require( __dirname + '/app.js' );

	const host = process.env.HOST || config.get( 'webserver.http.host' ).value();
	const port = process.env.PORT || config.get( 'webserver.http.port' ).value();
	const httpServer = http.createServer( app );

	httpServer.listen( port, host, ( err ) => {
		if ( err ) return console.error( chalk.magenta( '[HTTP-Server]' ), chalk.red( 'An unexpected error occurred.' ), err );;

		console.log( chalk.magenta( '[HTTP-Server]' ), chalk.green( 'Successfully started.' ) );
		console.log( chalk.magenta( '[HTTP-Server]' ), chalk.white( `Now listening on http://${host}:${port}` ) );
	} );
}

function setupHTTPSServer() {
	const fs = require( 'fs' );
	const https = require( 'https' );
	const app = require( __dirname + '/app.js' );

	const host = process.env.HTTPS_HOST || config.get( 'webserver.https.host' ).value();
	const port = process.env.HTTPS_PORT || config.get( 'webserver.https.port' ).value();
	const httpsServer = https.createServer( {
		cert: fs.readFileSync( process.env.HTTPS_CERT || config.get( 'webserver.https.cert' ).value() ),
		key: fs.readFileSync( process.env.HTTPS_KEY || config.get( 'webserver.https.key' ).value() )
	}, app );

	httpsServer.listen( port, host, ( err ) => {
		if ( err ) return console.error( chalk.magenta( '[HTTPS-Server]' ), chalk.red( 'An unexpected error occurred.' ), err );

		console.log( chalk.magenta( '[HTTPS-Server]' ), chalk.green( 'Successfully started.' ) );
		console.log( chalk.magenta( '[HTTPS-Server]' ), chalk.white( `Now listening on https://${host}:${port}` ) );
	} );
}

if ( config.get( 'webserver.http.enabled' ).value() ) {
	setupHTTPServer();
}

if ( config.get( 'webserver.https.enabled' ).value() ) {
	setupHTTPSServer();
}