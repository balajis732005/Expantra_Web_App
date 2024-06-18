package com.expantra_app.backend_expantra.jwt.security;

import com.expantra_app.backend_expantra.jwt.service.UserDetailsServiceImpl;
import com.expantra_app.backend_expantra.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Service
public class JwtFilter extends OncePerRequestFilter {

    @Qualifier("handlerExceptionResolver")
    private final HandlerExceptionResolver handlerExceptionResolver;

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    public JwtFilter(HandlerExceptionResolver handlerExceptionResolver) {
        this.handlerExceptionResolver=handlerExceptionResolver;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException
    {
        try
        {
            final String tokenHeader = request.getHeader(AUTHORIZATION);
            assert tokenHeader != null;
            final String jwtToken = tokenHeader.substring(7);
            final String userEmailFromToken = jwtService.extractUserEmailFromToken(jwtToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmailFromToken);
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );
            usernamePasswordAuthenticationToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
            filterChain.doFilter(request,response);
        }
        catch (Exception ex){
            handlerExceptionResolver.resolveException(request,response,null,ex);
        }

    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) throws ServletException {
        return request.getServletPath().contains("/expantra/register")
                || request.getServletPath().contains("/expantra/verify")
                || request.getServletPath().contains("/expantra/authenticate")
                || request.getServletPath().contains("/expantra/forgetpassword/email")
                || request.getServletPath().contains("/expantra/forgetpassword/verify")
                || request.getServletPath().contains("/expantra/forgetpassword/newpassword");
    }
}
