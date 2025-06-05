package com.windowbutlers.backend.repository;

import com.windowbutlers.backend.entity.ChristmasLights;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChristmasLightsRepo extends JpaRepository<ChristmasLights, Integer> {

    // Custom query to find all Christmas lightings that are in use
    @Query("SELECT cl FROM ChristmasLights cl WHERE cl.inUse = true")
    List<ChristmasLights> findByInUse();

    // Custom query to find all Christmas lightings by home ID
    @Query("SELECT cl FROM ChristmasLights cl JOIN cl.job j JOIN j.home h WHERE h.id = :homeID")
    List<ChristmasLights> findByHome_Id(@Param("homeID") Integer homeID);
}
