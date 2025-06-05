package com.windowbutlers.backend.repository;

import com.windowbutlers.backend.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface PaymentRepo extends JpaRepository<Payments, Integer> {
    
    @Query("SELECT p FROM Payments p WHERE p.client.id = :clientID")
    List<Payments> findByClientID(@Param("clientID") Integer clientID);
}


