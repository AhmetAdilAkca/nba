package com.nba.nba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nba.nba.entity.Game;

public interface GameRepository extends JpaRepository<Game, Integer> {
}
