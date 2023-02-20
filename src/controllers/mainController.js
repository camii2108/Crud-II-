const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");/* Una funcion  */

const controller = {
	index: (req, res) => {
		// Do the magic: en vez de mandarlo por send los datos se envian por una vista 
		let ofertas = products.filter(product => product.category === "in-sale");/* nos pide que mandemos las variable en dos partes  */
		let visitados = products.filter(product => product.category === "visited");
		res.render('index', {
			ofertas,
			visitados,
			toThousand
		});
	},
	search: (req, res) => {
		// Do the magic
		let { keywords } = req.query
		let results = products.filter(product => product.name.toLowerCase() === keywords.toLowerCase())

		res.render('results', {
			keywords,
			results,
			toThousand,
		})
	},
};

module.exports = controller;
