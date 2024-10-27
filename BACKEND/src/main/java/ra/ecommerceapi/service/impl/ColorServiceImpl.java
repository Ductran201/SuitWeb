package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.ColorRequest;
import ra.ecommerceapi.model.entity.Color;
import ra.ecommerceapi.repository.IColorRepo;
import ra.ecommerceapi.service.IColorService;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ColorServiceImpl implements IColorService {
    private final IColorRepo colorRepo;

    @Override
    public Page<Color> findAllByNameAdmin(String search, Pageable pageable) {
        return colorRepo.findByNameContains(search, pageable);
    }

    @Override
    public List<Color> findAll() {
        return colorRepo.findAll();
    }

    @Override
    public Boolean existByName(String name) {
        return colorRepo.existsByName(name);
    }

    @Override
    public Color findById(Long id) throws CustomException {
        return colorRepo.findById(id).orElseThrow(() -> new CustomException("Not found this color", HttpStatus.NOT_FOUND));
    }

    @Override
    public Color add(ColorRequest colorRequest) throws CustomException {

        if (colorRepo.existsByName(colorRequest.getName())) {
            throw new CustomException("This color is already exist", HttpStatus.CONFLICT);
        }

        Color color = Color.builder()
                .name(colorRequest.getName())
                .build();
        color.setCreatedDate(new Date());
        color.setStatus(true);
        return colorRepo.save(color);
    }

    @Override
    public Color update(ColorRequest colorRequest, Long id) throws CustomException {
        Color oldColor = findById(id);
        if (!oldColor.getName().equals(colorRequest.getName()) && colorRepo.existsByName(colorRequest.getName())) {
            throw new CustomException("This color already exist", HttpStatus.CONFLICT);
        }

        oldColor.setName(colorRequest.getName());
        return colorRepo.save(oldColor);
    }

    @Override
    public void delete(Long id) {
        colorRepo.deleteById(id);
    }

    @Override
    public void toggleStatus(Long id) {
        colorRepo.toggleStatus(id);
    }
}
