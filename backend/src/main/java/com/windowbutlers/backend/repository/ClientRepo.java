package com.windowbutlers.backend.repository;

import com.windowbutlers.backend.entity.Clients;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ClientRepo extends JpaRepository<Clients, Integer> {}