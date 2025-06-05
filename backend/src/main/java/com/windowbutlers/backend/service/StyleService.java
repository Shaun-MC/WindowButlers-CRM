package com.windowbutlers.backend.service;

import com.windowbutlers.backend.entity.Styles;
import com.windowbutlers.backend.dto.requests.CountsUpdateRequest;
import com.windowbutlers.backend.dto.requests.StyleRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface StyleService {
    
    IDResponse createStyle(StyleRequest style);

    Styles getStyle(Integer ID);

    String getStyleLabel(Integer ID);

    List<Styles> getAllStyles();

    SuccessfulUpdateResponse updateCounts(Integer ID, CountsUpdateRequest req);

    void addStyleToJob(Integer styleID, Integer jobID);
    
    DeleteMessageResponse deleteStyle(Integer ID);
}
