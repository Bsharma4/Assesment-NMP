-- TODO: Add MySQL/MariaDB table definitions

-- Table for storing board games
CREATE TABLE IF NOT EXISTS board_games(
    id INT AUTO_INCREMENT PRIMARY KEY,
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

-- TODO: Add sample data
INSERT INTO board_games (name, description) VALUES 
    ('Game 1', 'Description of Game 1'),
    ('Game 2', 'Description of Game 2');

INSERT INTO game_sessions (game_id, session_date) VALUES 
    (1, '2024-03-10'), 
    (2, '2024-03-12');
