package com.nba.nba.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "STATS", uniqueConstraints = {@UniqueConstraint(columnNames = {"player_id", "game_id"})})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Stats {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "player_id", nullable = false)
	private Player player;

	@ManyToOne
	@JoinColumn(name = "game_id", nullable = false)
	private Game game;

	@ManyToOne
	@JoinColumn(name = "team_id", nullable = false)
	private Team team;

	private Float minutesPlayed;
	private Integer points;
	private Integer rebounds;
	private Integer assists;
	private Integer steals;
	private Integer blocks;
	private Integer turnovers;

	private Integer fieldGoalsMade;
	private Integer fieldGoalsAttempted;
	private Integer threePointersMade;
	private Integer threePointersAttempted;
	private Integer freeThrowsMade;
	private Integer freeThrowsAttempted;

	private Integer personalFouls;
}
