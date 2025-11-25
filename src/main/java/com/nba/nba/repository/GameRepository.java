package com.nba.nba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nba.nba.config.entity.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {
  @org.springframework.data.jpa.repository.EntityGraph(attributePaths = { "homeTeam", "homeTeam.division",
      "homeTeam.division.conference", "awayTeam", "awayTeam.division", "awayTeam.division.conference", "season" })
  java.util.List<Game> findBySeasonId(Integer seasonId);

  @org.springframework.data.jpa.repository.EntityGraph(attributePaths = { "homeTeam", "homeTeam.division",
      "homeTeam.division.conference", "awayTeam", "awayTeam.division", "awayTeam.division.conference", "season" })
  java.util.List<Game> findAll();

  @org.springframework.data.jpa.repository.EntityGraph(attributePaths = { "homeTeam", "homeTeam.division",
      "homeTeam.division.conference", "awayTeam", "awayTeam.division", "awayTeam.division.conference", "season" })
  java.util.Optional<Game> findById(Integer id);
}
