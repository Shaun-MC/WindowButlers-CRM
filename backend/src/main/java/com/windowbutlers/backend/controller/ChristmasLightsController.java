package com.windowbutlers.backend.controller;

import com.windowbutlers.backend.entity.ChristmasLights;
import com.windowbutlers.backend.service.ChristmasLightsService;
import com.windowbutlers.backend.dto.requests.BooleanUpdateRequest;
import com.windowbutlers.backend.dto.requests.ChristmasLightsRequest;
import com.windowbutlers.backend.dto.requests.StorageLocationUpdateRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.LocationResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import com.windowbutlers.backend.validation.ValidID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/christmas-lights")
public class ChristmasLightsController {

    private final ChristmasLightsService clService;

    public ChristmasLightsController(ChristmasLightsService clService) {
        this.clService = clService;
    }

    // Passes Happy Path testing: 5/11/2025
    @PostMapping("/create")
    public ResponseEntity<?> createChristmasLights(@RequestBody @Valid ChristmasLightsRequest cl) {

        IDResponse id = clService.createChristmasLights(cl);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    // Passes Happy Path testing: 5/11/2025
    @GetMapping("/get/storageLocation/{id}")
    public ResponseEntity<?> getChristmasLightsStorageLocation(@PathVariable @ValidID Integer id) {

        LocationResponse response = clService.getChristmasLightsStorageLocation(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Passes Happy Path testing: 5/11/2025
    @GetMapping("/get/allChristmasLights")
    public ResponseEntity<?> getAllChristmasLights() {

        List<ChristmasLights> cls = clService.getAllChristmasLights();
        return ResponseEntity.status(HttpStatus.OK).body(cls);
    }

    // Passes Happy Path testing: 5/11/2025
    @GetMapping("/get/allChristmasLightsByHome/{homeID}")
    public ResponseEntity<?> getAllChristmasLightsByHomeID(@PathVariable @ValidID Integer homeID) {

        List<ChristmasLights> cl = clService.getAllChristmasLightsByHomeID(homeID);
        return ResponseEntity.status(HttpStatus.OK).body(cl);
    }

    // Passes Happy Path testing: 5/11/2025
    @GetMapping("/get/allInUse")
    public ResponseEntity<?> getAllInUseChristmasLights() {

        List<ChristmasLights> cl = clService.getAllInUseChristmasLights();
        return ResponseEntity.status(HttpStatus.OK).body(cl);
    }

    // Passes Happy Path testing: 5/11/2025
    @PutMapping("/update/storageLocation/{id}")
    public ResponseEntity<?> updateChristmasLightsStorageLocation(@PathVariable @ValidID Integer id, @RequestBody @Valid StorageLocationUpdateRequest storageLocation) {

        SuccessfulUpdateResponse response = clService.updateStorageLocation(id, storageLocation);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Passes Happy Path testing: 5/11/2025
    @PutMapping("/update/inUse/{id}")
    public ResponseEntity<?> updateChristmasLightsInUse(@PathVariable @ValidID Integer id, @RequestBody @Valid BooleanUpdateRequest req) {

        SuccessfulUpdateResponse response = clService.updateInUse(id, req);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Passes Happy Path testing: 5/11/2025
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteChristmasLights(@PathVariable @ValidID Integer id) {

        DeleteMessageResponse response = clService.deleteChristmasLights(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
