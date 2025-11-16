package com.nba.nba.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.nba.nba.entity.Player;
import com.nba.nba.repository.PlayerRepository;
import java.util.*;

@RestController
@RequestMapping("/api/players")
public class PlayerController {
	private final PlayerRepository repo;
	public PlayerController(PlayerRepository repo) { this.repo = repo; }

	@GetMapping
	public List<Player> all() { return repo.findAll(); }

	@GetMapping("/{id}")
	public ResponseEntity<Player> get(@PathVariable Integer id) {
		return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public Player create(@RequestBody Player player) { return repo.save(player); }

	@PutMapping("/{id}")
	public ResponseEntity<Player> update(@PathVariable Integer id, @RequestBody Player p) {
		return repo.findById(id).map(existing -> {
			p.setId(existing.getId());
			return ResponseEntity.ok(repo.save(p));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		if (!repo.existsById(id)) return ResponseEntity.notFound().build();
		repo.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
