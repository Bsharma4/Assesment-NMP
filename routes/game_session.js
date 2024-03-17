module.exports = {
    // Function to render add game session form
    getAdd: (req, res) => {
        // Ensure db is defined before using it
        if (!db) {
            console.error("Database connection is not established.");
            res.status(500).send("Internal Server Error");
            return;
        }

        const query = "SELECT * FROM board_games";
        db.query(query, (err, result) => {
            if (err) {
                console.error(err);
                res.redirect('/');
            } else {
                res.render('add-game-session.ejs', {
                    title: 'Board Games | Add Game Session',
                    games: result
                });
            }
        });
    },
    // Function to handle adding a new game session record associated with a game
    postAdd: (req, res) => {
        // Ensure db is defined before using it
        if (!db) {
            console.error("Database connection is not established.");
            res.status(500).send("Internal Server Error");
            return;
        }

        const { game_id, session_date, duration, players_count, notes } = req.body;
        const query = "INSERT INTO game_sessions (game_id, session_date, duration, players_count, notes) VALUES (?, ?, ?, ?, ?)";
        db.query(query, [game_id, session_date, duration, players_count, notes], (err, result) => {
            if (err) {
                console.error(err);
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        });
    }
};
