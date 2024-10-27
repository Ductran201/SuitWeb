package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.SizeRequest;
import ra.ecommerceapi.model.entity.Size;
import ra.ecommerceapi.repository.ISizeRepo;
import ra.ecommerceapi.service.ISizeService;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SizeServiceImpl implements ISizeService {
    private final ISizeRepo sizeRepo;

    @Override
    public Page<Size> findAllByNameAdmin(String search, Pageable pageable) {
        return sizeRepo.findByNameContains(search, pageable);
    }

    @Override
    public List<Size> findAll() {
        return sizeRepo.findAll();
    }

    @Override
    public Boolean existByName(String name) {
        return sizeRepo.existsByName(name);
    }

    @Override
    public Size findById(Long id) throws CustomException {
        return sizeRepo.findById(id).orElseThrow(() -> new CustomException("Not found this size", HttpStatus.NOT_FOUND));
    }

    @Override
    public Size add(SizeRequest sizeRequest) throws CustomException {

        if (sizeRepo.existsByName(sizeRequest.getName())) {
            throw new CustomException("This size is already exist", HttpStatus.CONFLICT);
        }

        Size size = Size.builder()
                .name(sizeRequest.getName())
                .build();
        size.setCreatedDate(new Date());
        size.setStatus(true);
        return sizeRepo.save(size);
    }

    @Override
    public Size update(SizeRequest sizeRequest, Long id) throws CustomException {
        Size oldSize = findById(id);
        if (!oldSize.getName().equals(sizeRequest.getName()) && sizeRepo.existsByName(sizeRequest.getName())) {
            throw new CustomException("This size already exist", HttpStatus.CONFLICT);
        }

        oldSize.setName(sizeRequest.getName());
        return sizeRepo.save(oldSize);
    }

    @Override
    public void delete(Long id) {
        sizeRepo.deleteById(id);
    }

    @Override
    public void toggleStatus(Long id) {
        sizeRepo.toggleStatus(id);
    }
}
