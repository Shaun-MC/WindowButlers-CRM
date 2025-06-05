package com.windowbutlers.backend.controller;

import com.windowbutlers.backend.entity.Clients;
import com.windowbutlers.backend.dto.requests.ClientRequest;
import com.windowbutlers.backend.dto.requests.EmailUpdateRequest;
import com.windowbutlers.backend.dto.requests.PhoneNumberUpdateRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import com.windowbutlers.backend.service.ClientService;
import com.windowbutlers.backend.validation.ValidID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/client")
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    // Passes Happy Path testing: 6/5/25
    @PostMapping("/create")
    public ResponseEntity<?> createClient(@RequestBody @Valid ClientRequest client) {

        IDResponse id = clientService.createClient(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    // Passes Happy Path testing: 6/5/25
    @GetMapping("/get/singleClient/{id}")
    public ResponseEntity<?> getSingleClient(@PathVariable @ValidID Integer id) {

        Clients client = clientService.getClient(id);
        return ResponseEntity.status(HttpStatus.OK).body(client);
    }

    // Passes Happy Path testing: 6/5/25
    @GetMapping("/get/allClients")
    public ResponseEntity<?> getAllClients() {

        List<Clients> clients = clientService.getAllClients();
        return ResponseEntity.status(HttpStatus.OK).body(clients);
    }

    // Passes Happy Path testing: 6/5/25
    @PutMapping("/update/email/{id}")
    public ResponseEntity<?> updateEmail(@PathVariable @ValidID Integer id, @RequestBody @Valid EmailUpdateRequest req) {

        SuccessfulUpdateResponse response = clientService.updateEmail(id, req);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Passes Happy Path testing: 6/5/25
    @PutMapping("/update/phoneNumber/{id}")
    public ResponseEntity<?> updatePhoneNumber(@PathVariable @ValidID Integer id, @RequestBody @Valid PhoneNumberUpdateRequest req) {

        SuccessfulUpdateResponse response = clientService.updatePhoneNumber(id, req);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Passes Happy Path testing: 6/5/25
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteClient(@PathVariable @ValidID Integer id) {

        DeleteMessageResponse response = clientService.deleteClient(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
