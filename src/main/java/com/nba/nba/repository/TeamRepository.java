package com.nba.nba.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nba.nba.entity.Team;

public interface TeamRepository extends JpaRepository<Team, Integer> {
}
