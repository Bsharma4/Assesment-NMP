// app.js
// Main entry point for application

const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs'); // Import the fs module
const app = express();
const { getHomePage, searchGames } = require('./routes/index'); // Import both getHomePage and searchGames
const game = require('./routes/game');
const game_session = require('./routes/game_session');
const config = require('./config'); // Import configuration file

// TODO: application port should come from config file
// Retrieve configuration values
const { port, dbConfig } = config;

// Function to execute a SQL query
function executeQuery(sql) {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

// Function to restart the database and reload schema file
function restartDatabase() {
    // Create a new database connection
    const db = mysql.createConnection(dbConfig);

    db.connect((err) => {
        if (err) {
            console.error('Error connecting to database:', err);
            return;
        }
        console.log('Connected to database');

        // Read the SQL file synchronously
        const sqlFileContent = fs.readFileSync('schema.sql', 'utf8');

        // Split the file content into individual SQL statements using a regular expression
        const sqlStatements = sqlFileContent.split(/;\s*\r?\n/).filter(statement => statement.trim() !== '');

        // Execute each SQL statement separately
        async function executeStatements() {
            for (const sqlStatement of sqlStatements) {
                try {
                    await executeQuery(sqlStatement);
                    console.log('SQL statement executed successfully:', sqlStatement);
                } catch (error) {
                    console.error('Error executing SQL statement:', error);
                }
            }
        }

        executeStatements();
    });

    // Set the global db variable to the new database connection
    global.db = db;
}

// Call the function to restart the database when the application starts
restartDatabase();

app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

// If there are static files, make a public directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', getHomePage);
app.get('/add-game', game.getAdd);
app.post('/add-game', game.postAdd);
app.get('/edit-game/:id', game.getEdit);
app.post('/edit-game/:id', game.postEdit);
app.get('/add-game-session', game_session.getAdd);
app.post('/add-game-session', game_session.postAdd);
app.get('/edit-game-session/:id', game_session.getEdit);
app.post('/edit-game-session/:id', game_session.postEdit);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
    console.log(`Please access it at : http://localhost:${port}/`);
});
