package com.windowbutlers.backend.service.implementation;

import com.windowbutlers.backend.dto.requests.ClientHomeAssociationRequest;
import com.windowbutlers.backend.dto.requests.RelationshipUpdateRequest;
import com.windowbutlers.backend.dto.ClientHomeAssociationDTO;
import com.windowbutlers.backend.dto.responses.AssociationResponse;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import com.windowbutlers.backend.entity.ClientHomeAssociation;
import com.windowbutlers.backend.entity.Clients;
import com.windowbutlers.backend.entity.Homes;
import com.windowbutlers.backend.service.ClientHomeAssociationService;
import com.windowbutlers.backend.repository.ClientHomeAssociationRepo;
import com.windowbutlers.backend.repository.ClientRepo;
import com.windowbutlers.backend.repository.HomeRepo;
import com.windowbutlers.backend.entity.ClientHomeKey;
import com.windowbutlers.backend.enums.RelationshipsToHome;
import com.windowbutlers.backend.exceptions.DataNotFoundException;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class ClientHomeAssociationServiceImpl implements ClientHomeAssociationService {

    private final ClientHomeAssociationRepo chaRepo;
    private final ClientRepo clientRepo;
    private final HomeRepo homeRepo;

    public ClientHomeAssociationServiceImpl(ClientHomeAssociationRepo chaRepo, 
                                            ClientRepo clientRepo, 
                                            HomeRepo homeRepo) {
        this.chaRepo = chaRepo;
        this.clientRepo = clientRepo;
        this.homeRepo = homeRepo;
    }

    @Override
    // This sucks
    public AssociationResponse createAssociation(ClientHomeAssociationRequest req) {

        Integer clientID = req.getClientID();
        Integer homeID = req.getHomeID();

        ClientHomeKey key = new ClientHomeKey(clientID, homeID);

        if (chaRepo.existsById(key)) {
            throw new DataNotFoundException("Association already exists for this client and home.");
        }

        ClientHomeAssociation clientHomeAssociation = new ClientHomeAssociation();

        Clients client = clientRepo.findById(clientID)
                .orElseThrow(() -> new DataNotFoundException("CreateAssociation: Client ID not found in the database"));

        Homes home = homeRepo.findById(homeID)
            .orElseThrow(() -> new DataNotFoundException("CreateAssociation: Home ID not found in the database"));

        clientHomeAssociation.setClientID(clientID, client);
        clientHomeAssociation.setHomeID(homeID, home);
        clientHomeAssociation.setRelationship(RelationshipsToHome.fromString(req.getRelationship()));

        chaRepo.save(clientHomeAssociation);

        return new AssociationResponse("Association created successfully");
    }

    @Override
    public List<ClientHomeAssociationDTO> getAllAssociations() {
        List<ClientHomeAssociation> entities = chaRepo.findAll();
        
        return entities.stream().map(cha -> new ClientHomeAssociationDTO(
            cha.getClient().getId(),
            cha.getHome().getId(),
            cha.getRelationship().getRelationship()
        )).toList();
    }

    @Override
    public List<ClientHomeAssociationDTO> getHomesForClient(Integer clientID) {
        List<ClientHomeAssociation> entities = chaRepo.findHomeIDByClientID(clientID);

        return entities.stream().map(cha -> new ClientHomeAssociationDTO(
            cha.getClient().getId(),
            cha.getHome().getId(),
            cha.getRelationship().getRelationship()
        )).toList();
    }

    @Override
    public List<ClientHomeAssociationDTO> getClientsForHome(Integer homeID) {
        List<ClientHomeAssociation> entities = chaRepo.findClientIDByHomeID(homeID);
        
        return entities.stream().map(cha -> new ClientHomeAssociationDTO(
            cha.getClient().getId(),
            cha.getHome().getId(),
            cha.getRelationship().getRelationship()
        )).toList();
    }

    @Override
    public AssociationResponse getAssociation(Integer clientID, Integer homeID) {
        
        return new AssociationResponse(chaRepo.findByClientIDAndHomeID(clientID, homeID));
    }

    @Override
    public List<String> getAllAssociationsForHome(Integer homeID) {
        
        return chaRepo.findAssociationsByHomeID(homeID);
    }

    @Override
    public SuccessfulUpdateResponse updateAssociation(Integer clientID, Integer homeID, RelationshipUpdateRequest req) {
        
        ClientHomeAssociation clientHomeAssociation = chaRepo.findById(new ClientHomeKey(clientID, homeID))
                .orElseThrow(() -> new DataNotFoundException("UpdateAssociation: Association not found in the database"));
        
        clientHomeAssociation.setRelationship(RelationshipsToHome.fromString(req.getRelationship()));
        chaRepo.save(clientHomeAssociation);

        return new SuccessfulUpdateResponse("association");
    }

    @Override
    public DeleteMessageResponse deleteAssociation(Integer clientID, Integer homeID) {
        
        if (!chaRepo.existsById(new ClientHomeKey(clientID, homeID))) {
            throw new DataNotFoundException("DeleteAssociation: Association not found in the database");
        }
        chaRepo.deleteById(new ClientHomeKey(clientID, homeID));

        return new DeleteMessageResponse("ClientHomeAssociation");
    }
}

