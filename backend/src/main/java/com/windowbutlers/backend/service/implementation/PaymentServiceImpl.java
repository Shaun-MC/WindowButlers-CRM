package com.windowbutlers.backend.service.implementation;

import com.windowbutlers.backend.entity.Payments;
import com.windowbutlers.backend.exceptions.DataNotFoundException;
import com.windowbutlers.backend.service.PaymentService;
import com.windowbutlers.backend.repository.PaymentRepo;
import com.windowbutlers.backend.entity.Clients;
import com.windowbutlers.backend.repository.ClientRepo;
import com.windowbutlers.backend.dto.requests.CostUpdateRequest;
import com.windowbutlers.backend.dto.requests.PaymentRequest;
import com.windowbutlers.backend.dto.responses.DeleteMessageResponse;
import com.windowbutlers.backend.dto.responses.IDResponse;
import com.windowbutlers.backend.dto.responses.PaymentFullfilledResponse;
import com.windowbutlers.backend.dto.responses.SuccessfulUpdateResponse;
import com.windowbutlers.backend.dto.responses.PaymentFullfilledResponse.JobSummary;
import com.windowbutlers.backend.entity.Jobs;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepo paymentRepo;
    private final ClientRepo clientRepo;

    public PaymentServiceImpl(PaymentRepo paymentRepo, ClientRepo clientRepo) {
        this.paymentRepo = paymentRepo;
        this.clientRepo = clientRepo;
    }

    @Override
    public IDResponse createPayment(PaymentRequest request) {

        Integer clientID = request.getClientID();
        
        Payments payment = new Payments();
        Clients client = clientRepo.findById(clientID).orElseThrow(() -> new DataNotFoundException("Client not found"));

        payment.setClient(client);
        payment.setCost(request.getCost());

        paymentRepo.save(payment);

        return new IDResponse(payment.getId());
    }

    @Override
    public Payments getPayment(Integer id) {

        return paymentRepo.findById(id).orElseThrow(() -> new DataNotFoundException("GetPayment: Payment not found in the database"));
    }

    @Override
    public List<Payments> getAllPayments() {
        return paymentRepo.findAll();
    }

    @Override
    public List<Payments> getPaymentsByClientID(Integer clientID) {

        List<Payments> payments = paymentRepo.findByClientID(clientID);
        if (payments.isEmpty()) {
            throw new DataNotFoundException("No payments found for client ID: " + clientID);
        }
        return payments;
    }

    @Override
    public PaymentFullfilledResponse isPaymentFullfilled(Integer id) {
        
        Payments payment = paymentRepo.findById(id)
                .orElseThrow(() -> new DataNotFoundException("isPaymentFullfilled: Payment not found in the database"));

        List<Jobs> jobs = payment.getJobs();

        // Early exit if no jobs are associated with the payment
        if (jobs == null || jobs.isEmpty()) {
            return new PaymentFullfilledResponse(false, null);
        }

        List<Jobs> unpaidJobs = jobs.stream().filter(j -> !j.getIsPaid()).collect(Collectors.toList());

        if (unpaidJobs.isEmpty()) {
            return new PaymentFullfilledResponse(true, null);
        } else {

            // Map the unpaid jobs and their details to a list of JobSummary objects
            List<JobSummary> summaries = unpaidJobs.stream().map(j -> new JobSummary(
                    j.getId().toString(),
                    j.getTitle() != null ? j.getTitle().name() : null,
                    j.getDateCompleted() != null ? j.getDateCompleted().toString() : null

            )).collect(Collectors.toList());
            
            return new PaymentFullfilledResponse(false, summaries);
        }
    }

    @Override
    public SuccessfulUpdateResponse updateCost(Integer id, CostUpdateRequest req) {

        Double newCost = req.getCost();

        Payments existingPayment = paymentRepo.findById(id).orElseThrow(() -> new DataNotFoundException("UpdateCost: Payment not found in the database"));
        existingPayment.setCost(newCost);
        paymentRepo.save(existingPayment);

        return new SuccessfulUpdateResponse("cost");
    }

    @Override
    public DeleteMessageResponse deletePayment(Integer id) {

        if (!paymentRepo.existsById(id)) {
            throw new DataNotFoundException("DeletePayment: Payment not found in the database");
        }
        
        paymentRepo.deleteById(id);

        return new DeleteMessageResponse("Payment");
    }
}
