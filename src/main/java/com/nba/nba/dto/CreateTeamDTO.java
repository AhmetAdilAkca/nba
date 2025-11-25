package com.nba.nba.dto;

import lombok.Data;

@Data
public class CreateTeamDTO {
  private String name;
  private String abbreviation;
  private String city;
  private Integer divisionId;
}
