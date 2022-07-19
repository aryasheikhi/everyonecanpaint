const express = require('express');
const app = express();
app.use(express.static('public'));
app.use((req, res) => {
    res.sendFile('index.html');
});

app.listen(process.env.PORT);
