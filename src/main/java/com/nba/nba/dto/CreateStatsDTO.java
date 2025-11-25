package com.nba.nba.dto;

import lombok.Data;

@Data
public class CreateStatsDTO {
  private Integer playerId;
  private Integer gameId;
  private Integer teamId;
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
