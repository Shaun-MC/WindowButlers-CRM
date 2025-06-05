package com.windowbutlers.backend.service;

import com.windowbutlers.backend.entity.Clients;
import com.windowbutlers.backend.dto.requests.ClientRequest;
import com.windowbutlers.backend.dto.requests.EmailUpdateRequest;
import com.windowbutlers.backend.dto.requests.PhoneNumberUpdateRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface ClientService {
    
    IDResponse createClient(ClientRequest client);

    Clients getClient(Integer id);

    List<Clients> getAllClients();

    SuccessfulUpdateResponse updateEmail(Integer id, EmailUpdateRequest email);

    SuccessfulUpdateResponse updatePhoneNumber(Integer id, PhoneNumberUpdateRequest phoneNumber);

    DeleteMessageResponse deleteClient(Integer id);
}
