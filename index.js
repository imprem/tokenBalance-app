const axios = require('axios');
const express = require('express');
const app = express();
const path = require('path');
const port = 3008;

async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data.response.currentBalance;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
}

async function fetchtier1() {
    return await fetchData('http://13.56.68.120:10090/dashboard/info/default/primarySupplier?nodeName=Tier1Supplier');
}

async function fetchtier2() {
    return await fetchData('http://13.56.68.120:10090/dashboard/info/secondarySupplier/emailId?nodeName=Tier2Supplier&emailId=admin@subconOne.com');
}

app.get('/tier1', async (req, res) => {
    try {
        const data = await fetchtier1();
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.get('/tier2', async (req, res) => {
    try {
        const data = await fetchtier2();
        res.send(data);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
