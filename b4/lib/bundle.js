/**
 * Provides API endpoints for working with book bundles.
 */
'use strict'
const rp = require('request-promise');

module.exports = (app, es) => {

	const url = `http://${es.host}:${es.port}/${es.bundles_index}/bundle`;

	/**
	 * Create a new bundle with specified name
	 * curl -X POST http://<host>:<port>/api/bundle?name=<name>
	 */
	app.post('/api/bundle', (req, res) => {
		const bundle = {
			name: req.query.name || '',
			books: [],
		}
		rp.post({url, body: bundle, json: true})
			.then(esResBody => res.status(201).json(esResBody))
			.catch(({error}) => res.status(error.status || 502).json(error));
	});
};
