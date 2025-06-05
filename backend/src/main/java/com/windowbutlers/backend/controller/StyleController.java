package com.windowbutlers.backend.controller;

import com.windowbutlers.backend.entity.Styles;
import com.windowbutlers.backend.service.StyleService;
import com.windowbutlers.backend.dto.requests.CountsUpdateRequest;
import com.windowbutlers.backend.dto.requests.StyleRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import com.windowbutlers.backend.validation.ValidID;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;


@RestController
@RequestMapping("/api/style")
public class StyleController {
    
    private final StyleService styleService;

    public StyleController(StyleService styleService) {
        this.styleService = styleService;
    }

    // Passes Happy Path testing: 5/11/25
    @PostMapping("/create")
    public ResponseEntity<?> createStyle(@RequestBody @Valid StyleRequest style) {

        IDResponse response = styleService.createStyle(style);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Passes Happy Path testing: 5/11/25
    @GetMapping("/get/singleStyle/{id}")
    public ResponseEntity<?> getSingleStyle(@PathVariable @ValidID Integer id) {

        Styles style = styleService.getStyle(id);
        return ResponseEntity.status(HttpStatus.OK).body(style);
    }

    // Passes Happy Path testing: 5/11/25
    @GetMapping("/get/allStyles")
    public ResponseEntity<?> getAllStyles() {

        List<Styles> styles = styleService.getAllStyles();
        return ResponseEntity.status(HttpStatus.OK).body(styles);
    }

    @GetMapping("/get/styleLabel/{id}")
    public ResponseEntity<?> getStyleLabel(@PathVariable @ValidID Integer id) {

        String styleLabel = styleService.getStyleLabel(id);
        return ResponseEntity.status(HttpStatus.OK).body(styleLabel);
    }

    // Technically states that nothing needs to be updateed
    @PutMapping("/update/counts/{id}")
    public ResponseEntity<?> updateStyleCounts(@PathVariable @ValidID Integer id, @RequestBody @Valid CountsUpdateRequest req) {

        SuccessfulUpdateResponse response = styleService.updateCounts(id, req);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PutMapping("/update/addStyleToJob/{styleID}/{jobID}")
    public ResponseEntity<?> putMethodName(@PathVariable @ValidID Integer styleID, @PathVariable @ValidID Integer jobID) {
        
        styleService.addStyleToJob(styleID, jobID);
        return ResponseEntity.status(HttpStatus.OK).body(String.format("Added Style %s to Job %s", styleID, jobID));
    }

    // Passes Happy Path testing: 5/11/25
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteStyle(@PathVariable @ValidID Integer id) {

        DeleteMessageResponse response = styleService.deleteStyle(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
}
