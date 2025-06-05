package com.windowbutlers.backend.service.implementation;

import com.windowbutlers.backend.dto.requests.BooleanUpdateRequest;
import com.windowbutlers.backend.dto.requests.ChristmasLightsRequest;
import com.windowbutlers.backend.dto.requests.StorageLocationUpdateRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.LocationResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import com.windowbutlers.backend.entity.ChristmasLights;
import com.windowbutlers.backend.service.ChristmasLightsService;
import com.windowbutlers.backend.repository.ChristmasLightsRepo;
import com.windowbutlers.backend.enums.LightColors;
import com.windowbutlers.backend.exceptions.DataNotFoundException;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class ChristmasLightsServiceImpl implements ChristmasLightsService {

    private final ChristmasLightsRepo clRepo;

    public ChristmasLightsServiceImpl(ChristmasLightsRepo clRepo) {
        this.clRepo = clRepo;
    }

    public IDResponse createChristmasLights(ChristmasLightsRequest request) {
        
        ChristmasLights cl = new ChristmasLights();

        cl.setStorageLocation(request.getStorageLocation());
        cl.setInUse(request.getInUse());
        cl.setColor(LightColors.valueOf(request.getColor().toUpperCase()));

        clRepo.save(cl);

        return new IDResponse(cl.getId()); 
    }

    public LocationResponse getChristmasLightsStorageLocation(Integer id) {
        
        return new LocationResponse(id, clRepo.findById(id).orElseThrow(() -> new DataNotFoundException("GetChristmasLightingStorageLocation: Christmas lighting ID not found in the database")).getStorageLocation());
    }

    public List<ChristmasLights> getAllChristmasLightsByHomeID(Integer homeID) {
        
        return clRepo.findByHome_Id(homeID);
    }

    public List<ChristmasLights> getAllChristmasLights() {

        return clRepo.findAll();
    }

    public List<ChristmasLights> getAllInUseChristmasLights() {
        
        return clRepo.findByInUse();
    }

    public SuccessfulUpdateResponse updateStorageLocation(Integer id, StorageLocationUpdateRequest req) {
        
        ChristmasLights cl = clRepo.findById(id).orElseThrow(() -> new DataNotFoundException("UpdateStorageLocation: Christmas lighting ID not found in the database"));
        String storageLocation = req.getStorageLocation();
        
        cl.setStorageLocation(storageLocation);
        clRepo.save(cl);

        return new SuccessfulUpdateResponse("storageLocation");
    }

    public SuccessfulUpdateResponse updateInUse(Integer id, BooleanUpdateRequest req) {
        
        Boolean inUse = req.getValue();
        ChristmasLights cl = clRepo.findById(id).orElseThrow(() -> new DataNotFoundException("UpdateInUse: Christmas lighting ID not found in the database"));
        
        cl.setInUse(inUse);
        clRepo.save(cl);

        return new SuccessfulUpdateResponse("inUse");
    }

    public DeleteMessageResponse deleteChristmasLights(Integer id) {

        if (!clRepo.existsById(id)) {
            throw new DataNotFoundException("DeleteChristmasLights: Christmas lighting ID not found in the database");
        }
        
        clRepo.deleteById(id);
        
        return new DeleteMessageResponse("Christmas Lights");
    }
}
