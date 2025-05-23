package com.windowbutlers.backend.controller;

import com.windowbutlers.backend.entity.Clients;
import com.windowbutlers.backend.dto.requests.ClientRequest;
import com.windowbutlers.backend.dto.requests.EmailUpdateRequest;
import com.windowbutlers.backend.dto.requests.PhoneNumberUpdateRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import com.windowbutlers.backend.service.ClientService;
import com.windowbutlers.backend.validation.ValidUUID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    // Passes Happy Path testing: 5/11/25
    @PostMapping("/create")
    public ResponseEntity<?> createClient(@RequestBody @Valid ClientRequest client) {

        IDResponse id = clientService.createClient(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    // Passes Happy Path testing: 5/11/25
    @GetMapping("/get/singleClient/{id}")
    public ResponseEntity<?> getSingleClient(@PathVariable @ValidUUID String id) {

        Clients client = clientService.getClient(UUID.fromString(id));
        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    // Passes Happy Path testing: 5/11/25
    @GetMapping("/get/allClients")
    public ResponseEntity<?> getAllClients() {

        List<Clients> clients = clientService.getAllClients();
        return ResponseEntity.status(HttpStatus.OK).body(clients);
    }

    // Passes Happy Path testing: 5/11/25
    @PutMapping("/update/email/{id}")
    public ResponseEntity<?> updateEmail(@PathVariable @ValidUUID String id, @RequestBody @Valid EmailUpdateRequest req) {

        SuccessfulUpdateResponse response = clientService.updateEmail(UUID.fromString(id), req);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Passes Happy Path testing: 5/11/25
    @PutMapping("/update/phoneNumber/{id}")
    public ResponseEntity<?> updatePhoneNumber(@PathVariable @ValidUUID String id, @RequestBody @Valid PhoneNumberUpdateRequest req) {

        SuccessfulUpdateResponse response = clientService.updatePhoneNumber(UUID.fromString(id), req);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Passes Happy Path testing: 5/11/25
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable @ValidUUID String id) {

        DeleteMessageResponse response = clientService.deleteClient(UUID.fromString(id));
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
