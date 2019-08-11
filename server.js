const express = require('express')
const cheerio = require('cheerio');
const axios = require('axios');

const url = 'https://github.com/frontendistanbul/technologies/blob/master/README.md';

const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {

    axios(url).then(data => {
        const $ = cheerio.load(data.data);
        const tableData = $('table > tbody > tr');

        const companies = [];

        tableData.each(function () {

            const name = $(this).find("td:nth-child(1)").text();
            const city = $(this).find("td:nth-child(2)").text();
            const www = $(this).find("td:nth-child(3)").text();
            const tech = $(this).find("td:nth-child(4)").text();

            companies.push({
                name,
                city,
                www,
                tech,
            });
        })
        return res.send(companies);
    })
})

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))