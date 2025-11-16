package com.nba.nba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nba.nba.entity.Stats;

public interface StatsRepository extends JpaRepository<Stats, Integer> {
}
