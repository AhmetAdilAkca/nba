-- Sample seed data for NBA project
-- Insert conference
INSERT INTO `CONFERENCE` (`conference_name`) VALUES ('EAST');
INSERT INTO `CONFERENCE` (`conference_name`) VALUES ('WEST');

-- Insert divisions (associate with conferences)
-- Assuming first conference id = 1 (EAST), second = 2 (WEST)
INSERT INTO `DIVISION` (`name`, `conf_id`) VALUES ('Atlantic', 1);
INSERT INTO `DIVISION` (`name`, `conf_id`) VALUES ('Central', 1);
INSERT INTO `DIVISION` (`name`, `conf_id`) VALUES ('Pacific', 2);

-- Insert teams (division_id must match created divisions)
INSERT INTO `TEAM` (`name`, `abbreviation`, `city`, `division_id`) VALUES ('Los Angeles Lakers', 'LAL', 'Los Angeles', 3);
INSERT INTO `TEAM` (`name`, `abbreviation`, `city`, `division_id`) VALUES ('Boston Celtics', 'BOS', 'Boston', 1);

-- Insert a season
INSERT INTO `SEASON` (`name`) VALUES ('2025-2026');

-- Insert players
INSERT INTO `PLAYER` (`player_name`, `player_surname`, `birth_day`, `height`, `weight`, `draft_year`, `draft_order`, `nationality`) VALUES
  ('LeBron', 'James', '1984-12-30', 206, 113, 2003, 1, 'USA'),
  ('Jayson', 'Tatum', '1998-03-03', 203, 98, 2017, 3, 'USA');

-- Insert a game between Lakers (id 1) and Celtics (id 2) in season id 1
INSERT INTO `GAME` (`date`, `home_score`, `away_score`, `game_type`, `home_id`, `away_id`, `season_id`) VALUES
  ('2025-11-23', 102, 99, 'Regular', 1, 2, 1);

-- Note: If your auto-generated IDs differ, adjust FK IDs above (division_id, home_id, away_id, season_id).
-- Run this file in your MySQL client (or execute the statements via DBeaver/Workbench) against the `nba` database.
