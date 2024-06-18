package com.expantra_app.backend_expantra.service.user.update;

import com.expantra_app.backend_expantra.dto.UpdateRequestDto;
import com.expantra_app.backend_expantra.dto.UpdateResponseDto;
import com.expantra_app.backend_expantra.entity.User;
import com.expantra_app.backend_expantra.exception.UserEmailNotFoundException;
import com.expantra_app.backend_expantra.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateServiceImpl implements UpdateService{

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UpdateResponseDto updateUser(UpdateRequestDto updateRequestDto) {

        User oldUser = userRepository.findById(updateRequestDto.getUserId())
                .orElseThrow(() -> new UserEmailNotFoundException("User Not Found"));

        oldUser.setFirstName(updateRequestDto.getFirstName());
        oldUser.setLastName(updateRequestDto.getLastName());
        oldUser.setGender(updateRequestDto.getGender());
        oldUser.setMobileNumber(updateRequestDto.getMobileNumber());
        oldUser.setEmail(updateRequestDto.getEmail());
        oldUser.setPassword(passwordEncoder.encode(updateRequestDto.getPassword()));
        userRepository.save(oldUser);
        return UpdateResponseDto.builder()
                .firstName(oldUser.getFirstName())
                .lastName(updateRequestDto.getLastName())
                .gender(updateRequestDto.getGender())
                .mobileNumber(updateRequestDto.getMobileNumber())
                .email(updateRequestDto.getEmail())
                .build();
    }
}
