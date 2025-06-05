package com.windowbutlers.backend.service;

import com.windowbutlers.backend.dto.ClientHomeAssociationDTO;
import com.windowbutlers.backend.dto.requests.ClientHomeAssociationRequest;
import com.windowbutlers.backend.dto.requests.RelationshipUpdateRequest;
import com.windowbutlers.backend.dto.responses.AssociationResponse;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface ClientHomeAssociationService {

    AssociationResponse createAssociation(ClientHomeAssociationRequest association);

    List<ClientHomeAssociationDTO> getAllAssociations();

    List<ClientHomeAssociationDTO> getHomesForClient(Integer clientID);

    List<ClientHomeAssociationDTO> getClientsForHome(Integer homeID);

    List<String> getAllAssociationsForHome(Integer homeID);
    
    AssociationResponse getAssociation(Integer clientID, Integer homeID);

    SuccessfulUpdateResponse updateAssociation(Integer clientID, Integer homeID, RelationshipUpdateRequest relation);

    DeleteMessageResponse deleteAssociation(Integer clientID, Integer homeID);
}