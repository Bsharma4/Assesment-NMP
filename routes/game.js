module.exports = {
	getAdd: (req, res) => {
		// Function to render add game form
		res.render('add-game.ejs', {
			title: 'Board Games | Add game'
		});
	},
	
    // Function to handle adding a new board game
    postAdd: (req, res) => {
        // TODO db.query to insert game
        const { game_name, description } = req.body;
        const query = "INSERT INTO board_games (game_name, description) VALUES (?, ?)";
        db.query(query, [game_name, description], (err, result) => {
            if (err) {
                console.error(err);
                res.redirect('/');
            } else {
                // If all went well, go back to main screen
                res.redirect('/');
            }
        });
    },

	getEdit: (req, res) => {
		// Function to render edit game form
		const gameId = req.params.id;
        const query = "SELECT * FROM board_games WHERE id = ?";
        db.query(query, [gameId], (err, result) => {
            if (err || result.length === 0) {
                console.error(err || "Game not found");
                res.redirect('/');
            } else {
                res.render('edit-game.ejs', {
                    title: 'Board Games | Edit Game',
                    game: result[0]
                });
            }
        });
	},
	
	// Function to handle editing an existing board game
    postEdit: (req, res) => {
        
        // TODO db.query to update game
        const { id, game_name, description } = req.body;
        const query = "UPDATE board_games SET game_name=?, description=? WHERE id=?";
        db.query(query, [game_name, description, id], (err, result) => {
            if (err) {
                console.error(err);
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        });
    }
};
