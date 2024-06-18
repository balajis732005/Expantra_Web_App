package com.expantra_app.backend_expantra.repository;

import com.expantra_app.backend_expantra.entity.WaitListingUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface WaitListingUserRepository extends JpaRepository<WaitListingUser, Long> {

    Optional<WaitListingUser> findByEmail(String email);

    void deleteByCreatedDateBefore(LocalDateTime localDateTime);

    boolean existsByEmail(String email);

}
