package com.windowbutlers.backend.controller;

import com.windowbutlers.backend.entity.Homes;
import com.windowbutlers.backend.service.HomeService;
import com.windowbutlers.backend.validation.ValidID;
import com.windowbutlers.backend.dto.requests.HomeRequest;
import com.windowbutlers.backend.dto.requests.NotesUpdateRequest;
import com.windowbutlers.backend.dto.requests.PowerSourceLocationUpdateRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    private final HomeService homeService;

    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    // Passes Happy Path testing: 6/5/25
    @PostMapping("/create")
    public ResponseEntity<?> createHome(@RequestBody @Valid HomeRequest home) {
        
        IDResponse response = homeService.createHome(home);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Passes Happy Path testing: 6/5/25
    @GetMapping("/get/singleHome/{id}")
    public ResponseEntity<?> getSingleHome(@PathVariable @ValidID Integer id) {

        Homes home = homeService.getHome(id);
        return ResponseEntity.status(HttpStatus.OK).body(home);
    }

    // Passes Happy Path testing: 6/5/25
    @GetMapping("/get/allHomes")
    public ResponseEntity<?> getAllHomes() {
        
        List<Homes> homes = homeService.getAllHomes();
        return ResponseEntity.status(HttpStatus.OK).body(homes);
    }

    // Passes Happy Path testing: 6/5/25
    @PutMapping("/update/notes/{id}")
    public ResponseEntity<?> updateNotes(@PathVariable @ValidID Integer id, @RequestBody @Valid NotesUpdateRequest req) {
        
        SuccessfulUpdateResponse response = homeService.updateNotes(id, req);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Passes Happy Path testing: 6/5/25
    @PutMapping("/update/powerSourceLocation/{id}")
    public ResponseEntity<?> updatePowerSourceLocation(@PathVariable @ValidID Integer id, @RequestBody @Valid PowerSourceLocationUpdateRequest req) {
        
        SuccessfulUpdateResponse response = homeService.updatePowerSourceLocation(id, req);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Passes Happy Path testing: 6/5/25
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteHome(@PathVariable @ValidID Integer id) {

        DeleteMessageResponse response = homeService.deleteHome(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
