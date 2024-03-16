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
        const query = `
            SELECT b.*, gs.session_date AS last_session_date
            FROM board_games b
            LEFT JOIN (
                SELECT game_id, MAX(session_date) AS session_date
                FROM game_sessions
                GROUP BY game_id
            ) gs ON b.id = gs.game_id
        `;

        db.query(query, (err, gamesResult) => {
            if (err) {
                console.error('Error retrieving games:', err);
                res.status(500).send('Internal Server Error');
            } else {
                // Fetch last session date for each game
                let lastSessionQuery = "SELECT game_id, MAX(session_date) AS last_session_date FROM game_sessions GROUP BY game_id";

                db.query(lastSessionQuery, (err, sessionsResult) => {
                    if (err) {
                        console.error('Error retrieving last session dates:', err);
                        res.status(500).send('Internal Server Error');
                    } else {
                        // Combine game data with last session dates
                        const games = gamesResult.map(game => {
                            const lastSession = sessionsResult.find(session => session.game_id === game.id);
                            return {
                                id: game.id,
                                name: game.name,
                                description: game.description,
                                last_session_date: lastSession ? lastSession.last_session_date : null
                            };
                        });

                        res.render('index.ejs', {
                            title: 'Board Games | View Games',
                            games: games
                        });
                    }
                });
            }
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
