package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.model.dto.request.AddressRequest;
import ra.ecommerceapi.model.dto.response.AddressResponse;
import ra.ecommerceapi.model.entity.Address;
import ra.ecommerceapi.model.entity.User;
import ra.ecommerceapi.repository.IAddressRepo;
import ra.ecommerceapi.service.IAddressService;
import ra.ecommerceapi.service.IAuthService;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements IAddressService {
    private final IAddressRepo addressRepo;
    private final IAuthService authService;
    private final ModelMapper modelMapper;

    @Override
    public List<AddressResponse> findAllByUser() {
        User userCurrent = authService.getCurrentUser().getUser();
        return addressRepo.findAllByUser(userCurrent).stream().map(ad -> modelMapper.map(ad, AddressResponse.class)).toList();
    }

    @Override
    public AddressResponse findByUserAndId(Long id) {
        User userCurrent = authService.getCurrentUser().getUser();

        Address findAddress = addressRepo.findByUserAndId(userCurrent, id).orElseThrow(() -> new NoSuchElementException("Not found this address"));

        return AddressResponse.builder()
                .id(findAddress.getId())
                .fullAddress(findAddress.getFullAddress())
                .userId(findAddress.getUser().getId())
                .nameReceiver(findAddress.getNameReceiver())
                .phoneReceiver(findAddress.getPhoneReceiver())
                .build();
    }


    @Override
    public AddressResponse save(AddressRequest addressRequest) {
        User userCurrent = authService.getCurrentUser().getUser();

        Address newAddress = Address.builder()
                .user(userCurrent)
                .fullAddress(addressRequest.getFullAddress())
                .nameReceiver(addressRequest.getNameReceiver())
                .phoneReceiver(addressRequest.getPhoneReceiver())
                .build();
        newAddress.setStatus(true);

        // save to database
        Address saveAddress= addressRepo.save(newAddress);

        AddressResponse addressResponse = modelMapper.map(saveAddress, AddressResponse.class);
        addressResponse.setUserId(saveAddress.getUser().getId());

        return addressResponse;
    }

    @Override
    public AddressResponse save(AddressRequest addressRequest, Long id) {

        Address oldAddress = addressRepo.findByUserAndId(authService.getCurrentUser().getUser(), id).orElseThrow(()-> new NoSuchElementException("Not found this address"));

        oldAddress.setFullAddress(addressRequest.getFullAddress());
        oldAddress.setNameReceiver(addressRequest.getNameReceiver());
        oldAddress.setPhoneReceiver(addressRequest.getPhoneReceiver());

        addressRepo.save(oldAddress);

        return AddressResponse.builder()
                .id(oldAddress.getId())
                .userId(oldAddress.getUser().getId())
                .phoneReceiver(oldAddress.getPhoneReceiver())
                .nameReceiver(oldAddress.getNameReceiver())
                .fullAddress(oldAddress.getFullAddress())
                .build();

    }

    @Override
    public void delete(Long id) {
        findByUserAndId(id);
        addressRepo.deleteById(id);
    }
}
