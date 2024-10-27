package ra.ecommerceapi.service.impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import ra.ecommerceapi.exception.CustomException;
import ra.ecommerceapi.model.dto.request.CategoryRequest;
import ra.ecommerceapi.model.entity.Category;
import ra.ecommerceapi.repository.ICategoryRepo;
import ra.ecommerceapi.service.ICategoryService;
import ra.ecommerceapi.service.UploadService;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements ICategoryService {
    private final ICategoryRepo categoryRepo;
    private final UploadService uploadService;

    @Override
    public List<Category> findAll() {
        return categoryRepo.findAll();
    }

    @Override
    public Page<Category> findAllPaginationAdmin(String search, Pageable pageable) {
        return categoryRepo.findAllByNameContains(search, pageable);
    }

    @Override
    public void toggleStatus(Long id) {
        categoryRepo.toggleStatus(id);
    }

    @Override
    public Page<Category> findAllPaginationUser(String search, Pageable pageable) {
        return categoryRepo.findAllByNameContainsAndStatusTrue(search, pageable);
    }

    @Override
    public Category findById(Long id) {
        return categoryRepo.findById(id).orElseThrow(() -> new NoSuchElementException("Not found this category"));
    }


    @Override
    public Category save(CategoryRequest categoryRequest) throws CustomException {

        if (categoryRepo.existsByName(categoryRequest.getName())) {
            throw new CustomException("This category already exist", HttpStatus.CONFLICT);
        }

        Category category = Category.builder()
                .name(categoryRequest.getName())
                .description(categoryRequest.getDescription())
                .build();
        category.setCreatedDate(new Date());
        category.setStatus(false);


        if (categoryRequest.getFile() != null && categoryRequest.getFile().getSize() > 0) {
            category.setImage(uploadService.uploadFileToServer(categoryRequest.getFile()));
        } else {
            category.setImage(null);
        }

        return categoryRepo.save(category);

    }

    @Override
    public Category save(CategoryRequest categoryRequest, Long id) throws CustomException {
        Category oldCategory = findById(id);

        if (!categoryRequest.getName().equals(oldCategory.getName()) && categoryRepo.existsByName(categoryRequest.getName())) {
            throw new CustomException("This category already exist", HttpStatus.CONFLICT);
        }

        // change manually by set each field or can be use modelMapper
        oldCategory.setName(categoryRequest.getName());
        oldCategory.setDescription(categoryRequest.getDescription());

        if (categoryRequest.getFile() != null && categoryRequest.getFile().getSize() > 0) {
            oldCategory.setImage(uploadService.uploadFileToServer(categoryRequest.getFile()));
        } else {
            oldCategory.setImage(categoryRepo.getImgById(id));
        }

        return categoryRepo.save(oldCategory);
    }

    @Override
    public void delete(Long id) {
        categoryRepo.deleteById(id);
    }
}
