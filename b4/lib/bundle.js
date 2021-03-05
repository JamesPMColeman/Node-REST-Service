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
		
	/**
	 * Retrieve a given bundle
	 * curl http://<host>:<port>/api/bundle/<id>
	 */
	app.get('/api/bundle/:id', async (req, res) => {
		const options = {
			url: `${url}/${req.params.id}`,
			json: true,
		};
		try {
			const esResBody = await rp(options);
			res.status(200).json(esResBody);
		} catch (esResErr) {
			res.status(esResErr.statusCode || 502).json(esResErr.error);
		}
	});
	
	/**
	 * Set the specified bundle's name with specified name.
	 * curl -X PUT http://<host>:<port>/api/bundle/<id>/name/<name>
	 */
	app.put('/api/bundle/:id/name/:name', async (req, res) => {
		const bundleUrl = `${url}/${req.params.id}`;

		try {
			const bundle = (await rp({url: bundleUrl, json: true}))._source;
			bundle.name = req.params.name;
			const esResBody = 
				await rp.put({url: bundleUrl, body: bundle, json: true});
			res.status(200).json(esResBody);
		} catch (esResErr) {
			res.status(esResErr.statusCode || 502).json(esResErr.error);
		}
	});
		
};
