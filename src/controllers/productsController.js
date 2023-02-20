const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = (products) => {
	fs.writeFileSync(productsFilePath, JSON.stringify(products), 'utf-8')
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic
		res.render('products',{
		products,
		toThousand,
	    })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		let productId = req.params.id;
		let product = products.find(product => product.id == productId);

		res.render("detail", {
			product,
			toThousand,
		})
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		let lastId = products[products.length -1].id;
		
		let newProduct = {
			id: lastId + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file ? req.file.filename : 'default-image.png'
		}

		products.push(newProduct)
		writeJson(products)
		res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		let productId = Number(req.params.id);
		let productToEdit = products.find(product  => product.id === productId);

		res.render('product-edit-form', {
			productToEdit,
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let productId = Number(req.params.id);

		products.forEach(product => {
			if(product.id === productId){
				product.name = req.body.name,
				product.price = req.body.price,
				product.discount = req.body.discount,
				product.category = req.body.category,
				product.description = req.body.description,
				product.image =  req.file ? req.file.filename : 'default-image.png'
			}
		})
		writeJson(products);
		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let productId = Number(req.params.id);
		let newProductsArray = products.filter(product => product.id !== productId);
		writeJson(newProductsArray);
		res.redirect('/products/');
	}
};

module.exports = controller;