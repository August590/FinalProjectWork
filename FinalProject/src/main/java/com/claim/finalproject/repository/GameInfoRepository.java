package com.claim.finalproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.claim.finalproject.entity.GameInfo;



@Repository
public interface GameInfoRepository extends JpaRepository<GameInfo, Long> {

}
