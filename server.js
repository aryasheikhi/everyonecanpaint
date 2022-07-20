const express = require('express');
const app = express();
app.use(express.static('public'));
app.use((req, res) => {
    res.sendFile('index.html');
});

const port = process.env.PORT || 4000;

app.listen(port);

console.log(`Server running on port ${port}`);
