package com.nba.nba.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.nba.nba.entity.Team;
import com.nba.nba.repository.TeamRepository;
import java.util.*;

@RestController
@RequestMapping("/api/teams")
public class TeamController {
	private final TeamRepository repo;
	public TeamController(TeamRepository repo) { this.repo = repo; }

	@GetMapping
	public List<Team> all() { return repo.findAll(); }

	@GetMapping("/{id}")
	public ResponseEntity<Team> get(@PathVariable Integer id) {
		return repo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public Team create(@RequestBody Team team) { return repo.save(team); }

	@PutMapping("/{id}")
	public ResponseEntity<Team> update(@PathVariable Integer id, @RequestBody Team t) {
		return repo.findById(id).map(existing -> {
			t.setId(existing.getId());
			return ResponseEntity.ok(repo.save(t));
		}).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Integer id) {
		if (!repo.existsById(id)) return ResponseEntity.notFound().build();
		repo.deleteById(id);
		return ResponseEntity.noContent().build();
	}
}
