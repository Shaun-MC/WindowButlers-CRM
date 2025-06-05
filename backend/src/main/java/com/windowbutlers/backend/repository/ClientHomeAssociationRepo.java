package com.windowbutlers.backend.repository;

import com.windowbutlers.backend.entity.ClientHomeAssociation;
import com.windowbutlers.backend.entity.ClientHomeKey;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

@Repository
public interface ClientHomeAssociationRepo extends JpaRepository<ClientHomeAssociation, ClientHomeKey> {

    @Query("SELECT cha FROM ClientHomeAssociation cha WHERE cha.client.id = :clientID")
    List<ClientHomeAssociation> findHomeIDByClientID(@Param("clientID") Integer clientID);
    
    @Query("SELECT cha FROM ClientHomeAssociation cha WHERE cha.home.id = :homeID")
    List<ClientHomeAssociation> findClientIDByHomeID(@Param("homeID") Integer homeID);
    
    @Query("SELECT cha.relationship FROM ClientHomeAssociation cha WHERE cha.client.id = :clientID AND cha.home.id = :homeID")
    String findByClientIDAndHomeID(@Param("clientID") Integer clientID, @Param("homeID") Integer homeID);

    @Query("SELECT cha.relationship FROM ClientHomeAssociation cha WHERE cha.home.id = :homeID")
    List<String> findAssociationsByHomeID(Integer homeID);
}
