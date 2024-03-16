module.exports = {
	getHomePage: (req, res) => {
		// TODO: Make query for games list
		let query = "SELECT * FROM board_games";

		db.query(query, (err, result) => {
			if (err) {
				console.error('Error retrieving games:', err);
                res.status(500).send('Internal Server Error');
			}
			res.render('index.ejs', {
				title: 'Board Games | View Games',
				games: result
			});
		});
	}
};
