const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const PORT = process.env.PORT || config.get('PORT');
const fileUpload = require('express-fileupload');
const authRouter = require('./routes/auth.routes');
const fileRouter = require('./routes/file.routes');
const changeRouter = require('./routes/change.routes');
const corsMiddleware = require('../server/middleware/cors.middleware');
const filePathMiddleware = require('./middleware/filepath.middleware');
const path = require('path');
const app = express();

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(filePathMiddleware(path.resolve(__dirname, 'files')));
app.use(express.json())
app.use(express.static("static"))
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);
app.use('/api/change', changeRouter);
const start = async() => {
    try{
        await mongoose.connect(config.get('mongooseUrl'));
        app.listen(PORT, () => {
            console.log("Started server " + PORT)
        });
    }catch(e){
        console.log(e)
    }
}

start();