module.exports = {
	getAdd: (req, res) => {
		res.render('add-game.ejs', {
			title: 'Board Games | Add game'
		});
	},
	getEdit: (req, res) => {
		res.render('edit-game.ejs', {
			title: 'Board Games | Edit game'
		});
	},
	postAdd: (req, res) => {
		// TODO db.query to insert game
		const { name, description } = req.body;

		// Insert game into the database
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
	postEdit: (req, res) => {
		let id = req.params.id;

		// TODO db.query to update game
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
