package com.windowbutlers.backend.service.implementation;

import com.windowbutlers.backend.entity.Styles;
import com.windowbutlers.backend.entity.Jobs;
import com.windowbutlers.backend.enums.StyleLabels;
import com.windowbutlers.backend.exceptions.DataNotFoundException;
import com.windowbutlers.backend.exceptions.InvalidRequestException;
import com.windowbutlers.backend.service.StyleService;
import com.windowbutlers.backend.repository.StyleRepo;
import com.windowbutlers.backend.repository.JobRepo;
import com.windowbutlers.backend.dto.requests.CountsUpdateRequest;
import com.windowbutlers.backend.dto.requests.StyleRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class StyleServiceImpl implements StyleService {

    private final StyleRepo styleRepo;
    private final JobRepo jobRepo;

    public StyleServiceImpl(StyleRepo styleRepo, JobRepo jobRepo) {
        this.styleRepo = styleRepo;
        this.jobRepo = jobRepo;
    }

    public IDResponse createStyle(StyleRequest req) {

        Styles style = new Styles();
        Jobs job = jobRepo.findById(req.getJobID()).orElseThrow(() -> new DataNotFoundException("Job not found"));
        
        style.setJob(job);
        style.setLabel(StyleLabels.fromString(req.getLabel()));
        style.setLarge(req.getLarge());
        style.setSmall(req.getSmall());
        
        styleRepo.save(style);
        return new IDResponse(style.getId());
    }

    public Styles getStyle(Integer ID) {
        
        return styleRepo.findById(ID).orElseThrow(() -> new DataNotFoundException("GetJobRepotyle: Job style ID not found in the database"));
    }

    public String getStyleLabel(Integer ID) {
        
        return styleRepo.findById(ID).orElseThrow(() -> new DataNotFoundException("GetJobRepotyleLabel: Job style ID not found in the database")).getLabel().toString();
    }

    public List<Styles> getAllStyles() {

        return styleRepo.findAll();
    }

    public SuccessfulUpdateResponse updateCounts(Integer ID, CountsUpdateRequest req) {
        
        Styles existingJobRepotyle = styleRepo.findById(ID).orElseThrow(() -> new DataNotFoundException("UpdateLargeCount: Job style not found in the database"));
        
        if (existingJobRepotyle.getLabel() != StyleLabels.WINDOWS && existingJobRepotyle.getLabel() != StyleLabels.TREES) {
            throw new InvalidRequestException("UpdateLargeCount: Counts are only available for Windows and Trees styles");
        }

        Integer large = req.getLarge();
        Integer small = req.getSmall();

        existingJobRepotyle.setLarge(large);
        existingJobRepotyle.setSmall(small);

        styleRepo.save(existingJobRepotyle);

        return new SuccessfulUpdateResponse("large and small count");
    }

    public void addStyleToJob(Integer styleID, Integer jobID) {

        Styles style = styleRepo.findById(styleID).orElseThrow(() -> new DataNotFoundException("AddStyleToJob: Style ID not found in the database"));
        Jobs job = jobRepo.findById(jobID).orElseThrow(() -> new DataNotFoundException("AddStyleToJob: Job ID not found in the database"));

        style.setJob(job);
        job.getJobStyles().add(style);

        styleRepo.save(style);
    }

    public DeleteMessageResponse deleteStyle(Integer id) {

        if (!styleRepo.existsById(id)) {
            throw new DataNotFoundException("DeleteStyle: Style ID not found in the database");
        }
        styleRepo.deleteById(id);

        return new DeleteMessageResponse("Style");
    }
}
