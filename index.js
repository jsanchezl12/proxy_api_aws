// app.js
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Define a route that makes an internal fetch and returns the result

app.all('/api/proxy', async (req, res) => {
    try {
        console.log('----------------------------------------------');
        console.log('[REQUEST]');
        console.log(`URL: ${req.url}`);
        console.log(`Headers: ${JSON.stringify(req.headers)}`);
        console.log(`Body: ${JSON.stringify(req.body)}`);
        const { url, method, headers, body } = req.body;
        const response = await fetch(url, {
            method: method || 'GET',
            headers: headers || {},
            body: body ? JSON.stringify(body) : null,
        });
        if (!response.status.toString().startsWith('2')) {
            console.log('Error Code: ', response.status);
            console.log('Error: ', response.statusText);
            throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
        //console.log(response)
        let data = {};
        if (response.status !== 204) {
            data = await response.json();
        }
        console.log('----------------------------------------------');
        console.log('[RESPONSE]');
        console.log(`Status: ${response.status}`);
        console.log(`Headers: ${JSON.stringify(response.headers)}`);
        console.log(`Body: ${JSON.stringify(data)}`);
        res.status(response.status).json({ success: true, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
