const express = require( 'express' );

const router = express.Router();

router.get( '/', ( req, res ) => {
	res.write( 'Welcome on this awesome page!' );
	res.end();
} );

module.exports = router;