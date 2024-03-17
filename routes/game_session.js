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

        // TODO db.query to insert game-playing session
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
    },

    // Function to render edit game session form
    getEdit: (req, res) => {
        // Ensure db is defined before using it
        if (!db) {
            console.error("Database connection is not established.");
            res.status(500).send("Internal Server Error");
            return;
        }

        const sessionId = req.params.id;
        const query = "SELECT * FROM game_sessions WHERE id = ?";
        db.query(query, [sessionId], (err, result) => {
            if (err || result.length === 0) {
                console.error(err || "Game session not found");
                res.redirect('/');
            } else {
                res.render('edit-game-session.ejs', {
                    title: 'Edit Game Session',
                    session: result[0]
                });
            }
        });
    },

    // Function to handle editing an existing game session
    postEdit: (req, res) => {
        if (!db) {
            console.error("Database connection is not established.");
            return res.status(500).send("Internal Server Error");
        }

        const { id, session_date, duration, players_count, notes } = req.body;
        const query = "UPDATE game_sessions SET session_date=?, duration=?, players_count=?, notes=? WHERE id=?";
        db.query(query, [session_date, duration, players_count, notes, id], (err, result) => {
            if (err) {
                console.error("Error editing game session:", err);
                return res.status(500).send("Internal Server Error");
            }
            else res.redirect('/');
        });
    }
};
