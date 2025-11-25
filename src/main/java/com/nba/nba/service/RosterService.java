package com.nba.nba.service;

import com.nba.nba.dto.CreateRosterDTO;
import com.nba.nba.config.entity.Roster;
import com.nba.nba.config.entity.Player;
import com.nba.nba.config.entity.Team;
import com.nba.nba.config.entity.Season;
import com.nba.nba.repository.RosterRepository;
import com.nba.nba.repository.PlayerRepository;
import com.nba.nba.repository.TeamRepository;
import com.nba.nba.repository.SeasonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RosterService {

  @Autowired
  private RosterRepository rosterRepository;

  @Autowired
  private PlayerRepository playerRepository;

  @Autowired
  private TeamRepository teamRepository;

  @Autowired
  private SeasonRepository seasonRepository;

  @Transactional
  public Roster createRoster(CreateRosterDTO dto) {
    Player player = playerRepository.findById(dto.getPlayerId())
        .orElseThrow(() -> new RuntimeException("Player not found"));
    Team team = teamRepository.findById(dto.getTeamId())
        .orElseThrow(() -> new RuntimeException("Team not found"));
    Season season = seasonRepository.findById(dto.getSeasonId())
        .orElseThrow(() -> new RuntimeException("Season not found"));

    Roster roster = new Roster();
    roster.setPlayer(player);
    roster.setTeam(team);
    roster.setSeason(season);
    roster.setJerseyNumber(dto.getJerseyNumber());
    roster.setPosition(dto.getPosition());

    return rosterRepository.save(roster);
  }
}
