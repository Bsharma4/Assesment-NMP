-- TODO: Add MySQL/MariaDB table definitions

-- Table for storing board games
CREATE TABLE IF NOT EXISTS board_games(
    id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- Table for storing game sessions
CREATE TABLE IF NOT EXISTS game_sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    game_id INT NOT NULL,
    session_date DATE NOT NULL,
    FOREIGN KEY (game_id) REFERENCES board_games(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

-- TODO: Delete existing sample data
-- Empty the tables and delete any sample data
DELETE FROM board_games;
DELETE FROM game_sessions;

-- TODO: Add sample data
INSERT INTO board_games (name, description) VALUES 
    ('Monopoly', 'Classic board game of real estate'),
    ('Catan', 'Strategy board game where players collect resources and build settlements.');

INSERT INTO game_sessions (segame_id, session_date) VALUES 
    (1, '2024-03-10'), 
    (2, '2024-03-12');
