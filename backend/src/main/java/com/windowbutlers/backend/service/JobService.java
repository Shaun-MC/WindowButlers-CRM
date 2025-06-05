package com.windowbutlers.backend.service;

import com.windowbutlers.backend.entity.Jobs;
import com.windowbutlers.backend.dto.requests.BooleanUpdateRequest;
import com.windowbutlers.backend.dto.requests.DifficultyUpdateRequest;
import com.windowbutlers.backend.dto.requests.JobRequest;
import com.windowbutlers.backend.dto.requests.LaborHoursUpdateRequest;
import com.windowbutlers.backend.dto.requests.NotesUpdateRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface JobService {
    
    IDResponse createJob(JobRequest job);
    
    Jobs getJob(Integer id);

    List<Jobs> getAllJobs();

    SuccessfulUpdateResponse updateLaborHours(Integer id, LaborHoursUpdateRequest req);
    
    SuccessfulUpdateResponse updateJobNotes(Integer id, NotesUpdateRequest req);
    
    SuccessfulUpdateResponse updateJobDifficulty(Integer id, DifficultyUpdateRequest req);

    SuccessfulUpdateResponse updateIsPaid(Integer id, BooleanUpdateRequest req);

    void addJobToPayment(Integer jobID, Integer paymentID);

    DeleteMessageResponse deleteJob(Integer id);
}
