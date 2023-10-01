const express = require('express');
const app = express();
const cors = require('cors');

const port = 3000;

app.use(cors());
app.use('/', express.static("public"));

const budget = {
    myBudget: [
        {
            title: 'Eat out',
            budget: 25
        },
        {
            title: 'Rent',
            budget: 375
        },
        {
            title: 'Grocery',
            budget: 110
        },
        {
            "title": "Entertainment",
            "budget": 30
        },
        {
            "title": "Travel",
            "budget": 50
        },
        {
            "title": "Emergency",
            "budget": 100
        },
        {
            "title": "Miscellaneous",
            "budget": 100
        }
    ]
};

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.get('/budget', (req, res) => {
    res.json(budget);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});