package com.windowbutlers.backend.service;

import com.windowbutlers.backend.entity.ChristmasLights;
import com.windowbutlers.backend.dto.requests.BooleanUpdateRequest;
import com.windowbutlers.backend.dto.requests.ChristmasLightsRequest;
import com.windowbutlers.backend.dto.requests.StorageLocationUpdateRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.LocationResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface ChristmasLightsService {
    
    IDResponse createChristmasLights(ChristmasLightsRequest cl);

    LocationResponse getChristmasLightsStorageLocation(Integer id);

    List<ChristmasLights> getAllChristmasLightsByHomeID(Integer homeID);

    List<ChristmasLights> getAllChristmasLights();

    List<ChristmasLights> getAllInUseChristmasLights();

    SuccessfulUpdateResponse updateStorageLocation(Integer id, StorageLocationUpdateRequest req);

    SuccessfulUpdateResponse updateInUse(Integer id, BooleanUpdateRequest req);

    DeleteMessageResponse deleteChristmasLights(Integer id);    
}
