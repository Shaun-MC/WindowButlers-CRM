package com.windowbutlers.backend.controller;
import com.windowbutlers.backend.dto.ClientHomeAssociationDTO;
import com.windowbutlers.backend.dto.requests.ClientHomeAssociationRequest;
import com.windowbutlers.backend.dto.requests.RelationshipUpdateRequest;
import com.windowbutlers.backend.dto.responses.AssociationResponse;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import com.windowbutlers.backend.service.ClientHomeAssociationService;
import com.windowbutlers.backend.validation.ValidID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/clientHomeAssociation")
public class ClientHomeAssociationController {
    
    private final ClientHomeAssociationService chaService;

    public ClientHomeAssociationController(ClientHomeAssociationService chaService) {
        this.chaService = chaService;
    }

    // Passes Happy Path testing: 5/11/25
    @PostMapping("/create")
    public ResponseEntity<?> createAssociation(@RequestBody @Valid ClientHomeAssociationRequest cha) {
        
        AssociationResponse id = chaService.createAssociation(cha);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    // Passes Happy Path testing: 5/11/25
    @GetMapping("/get/allAssociations")
    public ResponseEntity<?> getAllAssociations() {
        
        List<ClientHomeAssociationDTO> associations = chaService.getAllAssociations();
        return ResponseEntity.status(HttpStatus.OK).body(associations);
    }

    // Passes Happy Path testing: 5/11/25
    @GetMapping("/get/homes/{clientID}")
    public ResponseEntity<?> getHomesForClient(@PathVariable @ValidID Integer clientID) {
        
        List<ClientHomeAssociationDTO> homes = chaService.getHomesForClient(clientID);
        return ResponseEntity.status(HttpStatus.OK).body(homes);
    }

    // Passes Happy Path testing: 5/11/25
    @GetMapping("/get/clients/{homeID}")
    public ResponseEntity<?> getClientsForHome(@PathVariable @ValidID Integer homeID) {
        List<ClientHomeAssociationDTO> clients = chaService.getClientsForHome(homeID);
        return ResponseEntity.status(HttpStatus.OK).body(clients);
    }

    // Passes Happy Path testing: 5/11/25
    @GetMapping("/get/association/{clientID}/{homeID}")
    public ResponseEntity<?> getAssociation(@PathVariable Integer clientID, @PathVariable Integer homeID) {
        
        AssociationResponse association = chaService.getAssociation(clientID, homeID);
        return ResponseEntity.status(HttpStatus.OK).body(association);
    }

    // Passes Happy Path testing: 5/11/25
    @PutMapping("update/association/{clientID}/{homeID}")
    public ResponseEntity<?> updateAssociation(@PathVariable @ValidID Integer clientID, @PathVariable @ValidID Integer homeID, @RequestBody @Valid RelationshipUpdateRequest req) {
        
        SuccessfulUpdateResponse response = chaService.updateAssociation(clientID, homeID, req);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Passes Happy Path testing: 5/11/25
    @DeleteMapping("/delete/association/{clientID}/{homeID}")
    public ResponseEntity<?> deleteAssociation(@PathVariable @ValidID Integer clientID, @PathVariable @ValidID Integer homeID) {
        
        DeleteMessageResponse responce = chaService.deleteAssociation(clientID, homeID);
        return ResponseEntity.status(HttpStatus.OK).body(responce);
    }
}
