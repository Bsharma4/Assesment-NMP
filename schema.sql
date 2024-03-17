-- TODO Add MySQL/MariaDB table definitions

-- For Demo Drop existing tables if they exist
DROP TABLE IF EXISTS game_sessions;
DROP TABLE IF EXISTS board_games;

-- Table for storing board games
CREATE TABLE IF NOT EXISTS board_games(
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- Table for storing game sessions
CREATE TABLE IF NOT EXISTS game_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    session_date DATE NOT NULL,
    duration INT,
    players_count INT,
    notes TEXT,
    FOREIGN KEY (game_id) REFERENCES board_games(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- TODO Delete existing sample data
DELETE FROM board_games;
DELETE FROM game_sessions;

-- TODO Add sample data
INSERT INTO board_games (game_name, description) VALUES
    ('Settlers of Catan', 'A classic strategy board game where players collect resources and build settlements.'),
    ('Ticket to Ride', 'A railway-themed board game where players collect train cards to claim railway routes.'),
    ('Codenames', 'A word-based party game where players try to guess the words associated with their team.'),
    ('Pandemic', 'A cooperative board game where players work together to stop the spread of diseases across the world.');

-- Sample data insert statements for game_sessions table
INSERT INTO game_sessions (game_id, session_date, duration, players_count, notes) VALUES
    (1, '2024-03-15', 90, 2, 'Played with 4 players.'),
    (2, '2024-03-14', 60, 3, 'Two-player game.'),
    (3, '2024-03-13', 45, 5, 'Team A won.'),
    (4, '2024-03-12', 120, 3, 'Successfully cured all diseases.');
