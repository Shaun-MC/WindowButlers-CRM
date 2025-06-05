package com.windowbutlers.backend.service.implementation;

import com.windowbutlers.backend.entity.Homes;
import com.windowbutlers.backend.exceptions.DataNotFoundException;
import com.windowbutlers.backend.service.HomeService;
import com.windowbutlers.backend.repository.HomeRepo;
import com.windowbutlers.backend.dto.requests.HomeRequest;
import com.windowbutlers.backend.dto.requests.NotesUpdateRequest;
import com.windowbutlers.backend.dto.requests.PowerSourceLocationUpdateRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class HomeServiceImpl implements HomeService {

    private final HomeRepo homeRepo;

    public HomeServiceImpl(HomeRepo homeRepo) {
        this.homeRepo = homeRepo;
    }

    @Override
    public IDResponse createHome(HomeRequest req) {
        
        Homes home = new Homes();
        home.setNotes(req.getNotes());
        home.setPictureDirectoryURL(req.getPictureDirectoryURL());
        home.setAddressLine1(req.getAddressLine1());
        home.setCity(req.getCity());
        home.setZipCode(req.getZipCode());
        home.setPowerSourceLocation(req.getPowerSourceLocation());
        home.setHasOwnLights(req.getHasOwnLights());

        homeRepo.save(home);

        return new IDResponse(home.getId());
    }

    @Override
    public Homes getHome(Integer id) {

        return homeRepo.findById(id).orElseThrow(() -> new DataNotFoundException("GetHome: Home ID not found in the database"));
    }

    @Override
    public List<Homes> getAllHomes() {
        return homeRepo.findAll();
    }

    @Override
    public SuccessfulUpdateResponse updateNotes(Integer id, NotesUpdateRequest req) {
        
        String notes = req.getNotes();

        Homes home = homeRepo.findById(id).orElseThrow(() -> new DataNotFoundException("UpdateNotes: Home ID not found in the database"));
        home.setNotes(notes);
        homeRepo.save(home);

        return new SuccessfulUpdateResponse("notes");
    }

    @Override
    public SuccessfulUpdateResponse updatePowerSourceLocation(Integer id, PowerSourceLocationUpdateRequest req) {

        String location = req.getPowerSourceLocation();

        Homes home = homeRepo.findById(id).orElseThrow(() -> new DataNotFoundException("UpdatePowerSourceLocation: Home ID not found in the database"));
        home.setPowerSourceLocation(location);
        homeRepo.save(home);

        return new SuccessfulUpdateResponse("power source location");
    }

    @Override
    public DeleteMessageResponse deleteHome(Integer id) {

        if (!homeRepo.existsById(id)) {
            throw new DataNotFoundException("DeleteHome: Home ID not found in the database");
        }

        homeRepo.deleteById(id);

        return new DeleteMessageResponse("Home");
    }
}
