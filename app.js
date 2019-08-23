const express = require( 'express' );
const twig = require( 'twig' );

const app = express();

app.disable( 'x-powered-by' );

if ( process.env.NODE_ENV == 'development' ) {
	twig.cache( false );
	app.set( 'view cache', false );
}

app.set( 'views', __dirname + '/views/' );
app.set( 'view engine', 'twig' );
app.set( 'twig options', {
	allow_async: true,
	strict_variables: false
} );

app.use( express.urlencoded( {
	extended: true
} ) );
app.use( express.json() );
app.use( express.static( __dirname + '/static/' ) );

app.use( '/', require( __dirname + '/routes/index.js' ) );

app.use( ( req, res, next ) => {
	const pJson = require( __dirname + '/package.json' );

	res.status( 404 ).render( 'errors/404.twig', {
		version: pJson.version,
		url: req.originalUrl,
	} );
} );

app.use( ( err, req, res, next ) => {
	const chalk = require( 'chalk' );
	const pJson = require( __dirname + '/package.json' );
	const config = require( __dirname + '/libs/config.js' );

	console.error( chalk.magenta( '[Web-Server]' ), chalk.red( 'An unexpected error occurred.' ), err );
	res.status( 500 ).render( 'errors/500.twig', {
		version: pJson.version,
		email: config.get( 'app.owner.email' ).value()
	} );
} );


module.exports = app;