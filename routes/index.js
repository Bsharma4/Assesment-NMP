// routes/index.js

const mysql = require('mysql');
const dbConfig = require('../config').dbConfig;
const db = mysql.createConnection(dbConfig);

module.exports = {
    getHomePage: (req, res) => {
        // TODO: Make query for games list
        
        // Fetch list of board games and thier last played session
         const gamesQuery = "SELECT bg.id AS id, bg.game_name AS game_name, bg.description AS description, MAX(gs.session_date) AS last_session_date FROM board_games bg LEFT JOIN game_sessions gs ON bg.id = gs.game_id GROUP BY bg.id, bg.game_name, bg.description";
        // Fetch list of game sessions along with thier name in desc order of session_date 
         const sessionsQuery = "SELECT game_sessions.id, board_games.game_name, game_sessions.session_date, game_sessions.duration, game_sessions.players_count, game_sessions.notes FROM game_sessions JOIN board_games ON game_sessions.game_id = board_games.id ORDER BY game_sessions.session_date DESC";
 
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

};
