package com.expantra_app.backend_expantra.service.user.delete;

import com.expantra_app.backend_expantra.dto.PositiveResponseDto;
import com.expantra_app.backend_expantra.entity.User;
import com.expantra_app.backend_expantra.exception.UserEmailNotFoundException;
import com.expantra_app.backend_expantra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeleteServiceImpl implements DeleteService{

    private final UserRepository userRepository;

    @Override
    public PositiveResponseDto deleteUser(Long idToDelete) {
        System.out.println(idToDelete.getClass());
        System.out.println("1:"+idToDelete);
        User userObj = userRepository.findById(idToDelete)
                .orElseThrow(() -> new UserEmailNotFoundException("User Not Found"));
        userRepository.delete(userObj);
        System.out.println("2:"+idToDelete);
        var positive = PositiveResponseDto.builder()
                .successMessage("Account Delete Successfully");
        return positive.build();
    }
}
