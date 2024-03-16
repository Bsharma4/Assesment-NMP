module.exports = {
	getAdd: (req, res) => {
		// Function to render add game form
		res.render('add-game.ejs', {
			title: 'Board Games | Add game'
		});
	},
	// Function to handle adding a new board game
    postAdd: (req, res) => {
        const { name, description } = req.body;
        const query = "INSERT INTO board_games (name, description) VALUES (?, ?)";
        db.query(query, [name, description], (err, result) => {
            if (err) {
                console.error(err);
                res.redirect('/');
            } else {
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
        const { id, name, description } = req.body;
        const query = "UPDATE board_games SET name=?, description=? WHERE id=?";
        db.query(query, [name, description, id], (err, result) => {
            if (err) {
                console.error(err);
                res.redirect('/');
            } else {
                res.redirect('/');
            }
        });
    }
};
