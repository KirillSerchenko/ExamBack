const express = require('express');
const app = express();
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/servers');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/servers', usersRouter);

module.exports = app;
