const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJson = (products) => { /* que me sobrescriba el json, es decir que me los guarda */
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
		const {id} = req.params 
		const product = products.find(product => product.id === +id)
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
		const id =  Math.max(...products.map(el => el.id))
		const newProduct = {
			id: id + 1,
			...req.body,
			image : 'default-image.png'
		}
		products.push(newProduct)
		writeJson(products)
		res.redirect('/products')
		
		/*const {name, price, discount, category,description} = req.body
		const {} = req.body
		res.send(req.body)  */
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const {id} = req.params 
		const productToEdit = products.find(product => product.id === +id) 
		res.render('product-edit-form', {
			productToEdit
		})

	},

	
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const {id} = req.params
		const product = products.find(product => product.id === +id)

		if(!product){
			return res.send('noexiste ese producto')
		}
		const {name, price, discount, category, description} = req.body
		products.forEach(product => {
			if(product.id == id){
				product.name = name,
				product.price = price,
				product.discount = discount,
				product.description = description,
				product.category = category
			}
		});
		writeJson(products);
		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic:obtener el id del req params
		let productId = Number(req.params.id); /*  */

		//Busco el producto eliminar y lo borro del array
		products.forEach( product => {
			if(product.id === productId){
				let productToDestroy = products.indexOf(product);
				products.splice(productToDestroy, 1) 
			}
		})

		/* let newProductArray = products.filter(product => product.id !== productId) *//*  voy a tenener todos los productos menos el que quiero */

		//Sobre escribo el json con el array de productos modidifcados
		writeJson(products)
		
		// retorno un mensaje de exito 
		res.send("El producto fue destruido")

	}
};

module.exports = controller;