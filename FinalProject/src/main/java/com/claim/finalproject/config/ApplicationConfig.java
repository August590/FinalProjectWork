package com.claim.finalproject.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackages="com.claim.finalproject.repository")
@EntityScan(basePackages="com.claim.finalproject.entity")
public class ApplicationConfig {
}
