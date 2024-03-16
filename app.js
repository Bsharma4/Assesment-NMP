// app.js
// Main entry point for application

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const { getHomePage, searchGames } = require('./routes/index'); // Import both getHomePage and searchGames
const game = require('./routes/game');
const game_session = require('./routes/game_session');
const fs = require('fs'); // Import the fs module

// TODO: application port should come from config file
const config = require('./config');

// Retrieve configuration values
const { port, dbConfig } = config;

// TODO: database connection parameters should come from config file
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
    // Create tables if they don't exist
    // Read the SQL file synchronously
    const sqlFileContent = fs.readFileSync('schema.sql', 'utf8');

    // Split the file content into individual SQL statements
    const sqlStatements = sqlFileContent.split(';').filter(statement => statement.trim() !== '');

    // Execute each SQL statement separately
    sqlStatements.forEach(sqlStatement => {
        db.query(sqlStatement, (err, result) => {
            if (err) {
                console.error('Error executing SQL statement:', err);
            } else {
                console.log('SQL statement executed successfully:', sqlStatement);
            }
        });
    });
});

global.db = db;

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// If there are static files, make a public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', getHomePage);
app.get('/search', searchGames); // Use searchGames directly here
app.get('/add-game', game.getAdd);
app.post('/add-game', game.postAdd);
app.get('/edit-game/:id', game.getEdit);
app.post('/edit-game/:id', game.postEdit);
app.get('/add-game-session', game_session.getAdd);
app.post('/add-game-session', game_session.postAdd);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`Please access it at : http://localhost:${port}/`);
});
