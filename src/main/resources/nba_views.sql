USE nba;
CREATE OR REPLACE VIEW VIEW_PLAYER_SEASON_STATS AS
SELECT 
    p.id AS player_id,
    p.player_name,
    p.player_surname,
    s.id AS season_id,
    s.name AS season_name,
    COUNT(st.id) AS games_played,
    ROUND(AVG(st.points), 2) AS avg_points,
    ROUND(AVG(st.rebounds), 2) AS avg_rebounds,
    ROUND(AVG(st.assists), 2) AS avg_assists,
    ROUND(AVG(st.steals), 2) AS avg_steals,
    ROUND(AVG(st.blocks), 2) AS avg_blocks,
    ROUND(AVG(st.field_goals_made * 100.0 / NULLIF(st.field_goals_attempted, 0)), 2) AS fg_percentage,
    MAX(st.points) AS max_points
FROM PLAYER p
JOIN STATS st ON p.id = st.player_id
JOIN GAME g ON st.game_id = g.id
JOIN SEASON s ON g.season_id = s.id
GROUP BY p.id, s.id, p.player_name, p.player_surname, s.name;

CREATE OR REPLACE VIEW VIEW_TEAM_SEASON_PERFORMANCE AS
SELECT 
    t.id AS team_id,
    t.name AS team_name,
    s.id AS season_id,
    s.name AS season_name,
    COUNT(g.id) AS games_played,
    ROUND(AVG(CASE WHEN g.home_id = t.id THEN g.home_score ELSE g.away_score END), 2) AS avg_points_scored,
    ROUND(AVG(CASE WHEN g.home_id = t.id THEN g.away_score ELSE g.home_score END), 2) AS avg_points_allowed,
    SUM(CASE WHEN (g.home_id = t.id AND g.home_score > g.away_score) OR (g.away_id = t.id AND g.away_score > g.home_score) THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN (g.home_id = t.id AND g.home_score < g.away_score) OR (g.away_id = t.id AND g.away_score < g.home_score) THEN 1 ELSE 0 END) AS losses
FROM TEAM t
JOIN GAME g ON t.id = g.home_id OR t.id = g.away_id
JOIN SEASON s ON g.season_id = s.id
GROUP BY t.id, t.name, s.id, s.name;

CREATE OR REPLACE VIEW VIEW_SHOOTING_EFFICIENCY AS
SELECT 
    p.id AS player_id,
    p.player_name,
    p.player_surname,
    s.id AS season_id,
    SUM(st.field_goals_made) as total_fgm,
    SUM(st.field_goals_attempted) as total_fga,
    ROUND(SUM(st.field_goals_made) * 100.0 / NULLIF(SUM(st.field_goals_attempted), 0), 1) as fg_pct,
    SUM(st.three_pointers_made) as total_3pm,
    SUM(st.three_pointers_attempted) as total_3pa,
    ROUND(SUM(st.three_pointers_made) * 100.0 / NULLIF(SUM(st.three_pointers_attempted), 0), 1) as three_pct,
    ROUND(SUM(st.points) * 100.0 / NULLIF(2 * (SUM(st.field_goals_attempted) + 0.44 * SUM(st.free_throws_attempted)), 0), 1) as ts_pct
FROM STATS st
JOIN PLAYER p ON st.player_id = p.id
JOIN GAME g ON st.game_id = g.id
JOIN SEASON s ON g.season_id = s.id
GROUP BY p.id, p.player_name, p.player_surname, s.id;
