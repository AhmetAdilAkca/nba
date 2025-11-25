package com.nba.nba.controller;

import com.nba.nba.dto.StandingsDTO;
import com.nba.nba.config.entity.Game;
import com.nba.nba.config.entity.Stats;
import com.nba.nba.repository.StatsRepository;
import com.nba.nba.config.entity.Season;
import com.nba.nba.repository.SeasonRepository;
import com.nba.nba.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/games")
public class GameController {

	@Autowired
	private GameService gameService;

	@Autowired
	private StatsRepository statsRepository;

	@Autowired
	private SeasonRepository seasonRepository;

	@GetMapping
	public List<Game> getAllGames(@RequestParam(required = false) Integer seasonId,
			@RequestParam(required = false) Integer teamId) {
		return gameService.getAllGames(seasonId, teamId);
	}

	@GetMapping("/seasons")
	public List<Season> getAllSeasons() {
		return gameService.getAllSeasons();
	}

	@GetMapping("/recent")
	public List<Game> getRecentGames() {
		return gameService.getRecentGames();
	}

	@GetMapping("/standings")
	public List<StandingsDTO> getStandings(@RequestParam(required = false) Integer seasonId) {
		if (seasonId == null) {
			// pick latest season by id if none provided
			List<Season> seasons = seasonRepository.findAll();
			if (seasons.isEmpty()) {
				return java.util.Collections.emptyList();
			}
			seasons.sort(java.util.Comparator.comparing(Season::getId).reversed());
			seasonId = seasons.get(0).getId();
		}
		return gameService.getStandings(seasonId);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Game> getGameById(@PathVariable Integer id) {
		return gameService.getGameById(id)
				.map(ResponseEntity::ok)
				.orElse(ResponseEntity.notFound().build());
	}

	@GetMapping("/{id}/boxscore")
	public List<Stats> getBoxScore(@PathVariable Integer id) {
		return statsRepository.findByGameId(id);
	}
}
