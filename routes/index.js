// routes/index.js

const mysql = require('mysql');
const dbConfig = require('../config').dbConfig;
const db = mysql.createConnection(dbConfig);

// Function to search for board games by name
function searchGamesByName(query, callback) {
    db.query(query, (err, result) => {
        if (err) {
            console.error('Error searching games:', err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
}

module.exports = {
    getHomePage: (req, res) => {
        // Fetch list of board games
         // Fetch list of board games and game sessions
         const gamesQuery = "SELECT * FROM board_games";
         const sessionsQuery = "SELECT * FROM game_sessions";
 
         db.query(gamesQuery, (err, gamesResult) => {
             if (err) {
                 console.error('Error retrieving games:', err);
                 res.status(500).send('Internal Server Error');
                 return;
             }
 
             db.query(sessionsQuery, (err, sessionsResult) => {
                 if (err) {
                     console.error('Error retrieving game sessions:', err);
                     res.status(500).send('Internal Server Error');
                     return;
                 }
 
                 res.render('index.ejs', {
                     title: 'Board Games | View Games',
                     games: gamesResult,
                     sessions: sessionsResult
                 });
             });
         });
     },

    // Function to handle searching for board games
    searchGames: (req, res) => {
        const searchTerm = req.query.search;
        const query = `SELECT * FROM board_games WHERE name LIKE '%${searchTerm}%'`;
        searchGamesByName(query, (err, result) => {
            if (err) {
                console.error('Error searching games:', err);
                res.status(500).send('Internal Server Error');
            } else {
                res.render('index.ejs', {
                    title: 'Board Games | View Games',
                    games: result
                });
            }
        });
    }

};
