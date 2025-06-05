package com.windowbutlers.backend.repository;

import com.windowbutlers.backend.entity.Jobs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepo extends JpaRepository<Jobs, Integer> {}
