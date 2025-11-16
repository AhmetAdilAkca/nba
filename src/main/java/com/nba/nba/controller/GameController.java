package com.nba.nba.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.nba.nba.entity.Game;
import com.nba.nba.repository.GameRepository;
import java.util.*;

@RestController
@RequestMapping("/api/games")
public class GameController {
	private final GameRepository repo;
	public GameController(GameRepository repo) { this.repo = repo; }

	@GetMapping
	public List<Game> all() { return repo.findAll(); }

	@GetMapping("/{id}")
	public ResponseEntity<Game> get(@PathVariable Integer id) {
		return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public Game create(@RequestBody Game game) { return repo.save(game); }

	@PutMapping("/{id}")
	public ResponseEntity<Game> update(@PathVariable Integer id, @RequestBody Game g) {
		return repo.findById(id).map(existing -> {
			g.setId(existing.getId());
			return ResponseEntity.ok(repo.save(g));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		if (!repo.existsById(id)) return ResponseEntity.notFound().build();
		repo.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
