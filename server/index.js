const app = require('./app')
const PORT = 8080;


app.listen(process.env.PORT || PORT, () => {
    console.log(`it's alive on http://localhost:${PORT}`);
});
