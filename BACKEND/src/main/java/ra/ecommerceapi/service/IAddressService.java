package ra.ecommerceapi.service;

import ra.ecommerceapi.model.dto.request.AddressRequest;
import ra.ecommerceapi.model.dto.response.AddressResponse;

import java.util.List;

public interface IAddressService {
    List<AddressResponse> findAllByUser();

    AddressResponse findByUserAndId(Long id);

    AddressResponse save(AddressRequest addressRequest);

    AddressResponse save(AddressRequest addressRequest,Long id);

    void delete(Long id);



}
