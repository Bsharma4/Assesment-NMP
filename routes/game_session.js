module.exports = {
	getAdd: (req, res) => {
		res.render('add-game-session.ejs', {
			title: 'Board Games | Add game Session'
		});
	},
	postAdd: (req, res) => {
		console.log(req.body);
		// TODO db.query to insert game-playing session
		const { game_id, session_date } = req.body;

		// Insert game-playing session into the database
		const query = "INSERT INTO game_sessions (game_id, session_date) VALUES (?, ?)";
		db.query(query, [game_id, session_date], (err, result) => {
			if (err) {
				console.error(err);
				res.redirect('/');
			} else {
				res.redirect('/');
			}
		});
	}
};
