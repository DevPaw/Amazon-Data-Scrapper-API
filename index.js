const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = 'f3b9bf87e39168a10fb5073748841523'
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Data Scrapper.');
})

//GET PRODUCT DETAILS
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/dp/${productId}`);

        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error)
    }
})

//GET PRODUCT REVIEW
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/product-reviews/${productId}`);

        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error)
    }
})

//GET PRODUCT OFFERS
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error)
    }
})

//GET SEARCH RESULTS
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.in/s?k=${searchQuery}`);

        res.json(JSON.parse(response));

    } catch (error) {
        res.json(error)
    }
})

app.listen(PORT, () => console.log(`server running on port http://localhost:${PORT}`)) 