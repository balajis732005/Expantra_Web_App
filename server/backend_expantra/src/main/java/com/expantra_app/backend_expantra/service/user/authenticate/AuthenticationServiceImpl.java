package com.expantra_app.backend_expantra.service.user.authenticate;

import com.expantra_app.backend_expantra.dto.AuthenticateRequestDto;
import com.expantra_app.backend_expantra.dto.AuthenticationResponseDto;
import com.expantra_app.backend_expantra.entity.User;
import com.expantra_app.backend_expantra.exception.InvalidUserCredentialsException;
import com.expantra_app.backend_expantra.exception.UserEmailNotFoundException;
import com.expantra_app.backend_expantra.jwt.security.JwtService;
import com.expantra_app.backend_expantra.repository.UserRepository;
import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponseDto authenticateUser(AuthenticateRequestDto authenticateRequestDto) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticateRequestDto.getEmail(),
                        authenticateRequestDto.getPassword()
                )
        );
        if(!auth.isAuthenticated()){
            throw new InvalidUserCredentialsException("Invalid User Credentials");
        }
        var dbData = userRepository.findByEmail(authenticateRequestDto.getEmail())
                .orElseThrow(()-> new UserEmailNotFoundException("User Email not Found"));
        var claims = new HashMap<String, Object>();
        var user = (User)auth.getPrincipal();
        claims.put("role",user.getRole());
        String jwtToken = jwtService.generateToken(claims,user);
        return AuthenticationResponseDto.builder()
                .userId(dbData.getUserId())
                .firstName(dbData.getFirstName())
                .lastName(dbData.getLastName())
                .gender(dbData.getGender())
                .age(dbData.getAge())
                .mobileNumber(dbData.getMobileNumber())
                .email(dbData.getEmail())
                .role(dbData.getRole().toString())
                .jwtToken(jwtToken)
                .build();
    }
}
