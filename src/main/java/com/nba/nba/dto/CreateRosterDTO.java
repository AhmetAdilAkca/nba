package com.nba.nba.dto;

import lombok.Data;

@Data
public class CreateRosterDTO {
  private Integer playerId;
  private Integer teamId;
  private Integer seasonId;
  private Byte jerseyNumber;
  private String position;
}
