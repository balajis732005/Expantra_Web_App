package com.expantra_app.backend_expantra.repository;

import com.expantra_app.backend_expantra.entity.ActivationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ActivationCodeRepository extends JpaRepository<ActivationCode, Long> {

    Optional<ActivationCode> findByActivationCode(String activationCode);

}
