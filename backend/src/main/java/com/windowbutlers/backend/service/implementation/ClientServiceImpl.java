package com.windowbutlers.backend.service.implementation;

import com.windowbutlers.backend.entity.Clients;
import com.windowbutlers.backend.exceptions.DataNotFoundException;
import com.windowbutlers.backend.dto.requests.ClientRequest;
import com.windowbutlers.backend.dto.requests.EmailUpdateRequest;
import com.windowbutlers.backend.dto.requests.PhoneNumberUpdateRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import com.windowbutlers.backend.service.ClientService;
import com.windowbutlers.backend.repository.ClientRepo;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import java.util.List;

@Component
@Validated
public class ClientServiceImpl implements ClientService {

    private final ClientRepo clientRepo;

    public ClientServiceImpl(ClientRepo clientRepo) {
        this.clientRepo = clientRepo;
    }

    @Override
    public IDResponse createClient(ClientRequest request) {
        
        Clients client = new Clients();
        client.setFirstName(request.getFirstName());
        client.setLastName(request.getLastName());
        client.setEmail(request.getEmail());
        client.setPhoneNumber(request.getPhoneNumber());

        clientRepo.save(client);

        return new IDResponse(client.getId());
    }

    @Override
    public Clients getClient(Integer id) {
        
        return clientRepo.findById(id).orElseThrow(() -> new DataNotFoundException("GetClient: Client ID not found in the database"));
    }

    @Override
    public List<Clients> getAllClients() {
        return clientRepo.findAll();
    }

    @Override
    public SuccessfulUpdateResponse updateEmail(Integer id, EmailUpdateRequest req) {
        
        String email = req.getEmail();
        Clients client = clientRepo.findById(id).orElseThrow(() -> new DataNotFoundException("UpdateEmail: Client ID not found in the database"));
        client.setEmail(email);
        clientRepo.save(client);

        return new SuccessfulUpdateResponse("Email");
    }

    @Override
    public SuccessfulUpdateResponse updatePhoneNumber(Integer id, PhoneNumberUpdateRequest req) {
        
        String phoneNumber = req.getPhoneNumber();
        Clients client = clientRepo.findById(id).orElseThrow(() -> new RuntimeException("UpdatePhoneNumber: Client ID not found in the database"));
        client.setPhoneNumber(phoneNumber);
        clientRepo.save(client);

        return new SuccessfulUpdateResponse("Phone number");
    }

    @Override
    public DeleteMessageResponse deleteClient(Integer id) {

        if (!clientRepo.existsById(id)) {
            throw new DataNotFoundException("DeleteClient: Client ID not found in the database");
        }
        clientRepo.deleteById(id);

        return new DeleteMessageResponse("Client");
    }
}