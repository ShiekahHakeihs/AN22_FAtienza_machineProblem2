// load express for our backend
const express = require('express');
const mongoose = require('mongoose');
// allows us to control tha app's Cross Origin Resource Sharing
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

mongoose.connect(`mongodb+srv://admin:202110435@sandbox.0qk2xgg.mongodb.net/sample_database?retryWrites=true&w=majority`,{
		useNewUrlParser: true,
		useUnifiedTopology: true
	});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas'));

// allows all resources to access our backend application
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(process.env.PORT || 4000, () => {
	console.log(`API is now online on port ${ process.env.PORT || 4000}`)
});

/*
	Program: 	 E-commerce API
	Programmer:  Fred Dominic Atienza
	Section: 	 AN22
	Start Date:  July 15, 2023 
	End Date:  	 July 16, 2023 
*/
