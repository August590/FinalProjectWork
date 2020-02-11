package com.claim.finalproject.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.claim.finalproject.entity.GameInfo;
import com.claim.finalproject.entity.UserInfo;
import com.claim.finalproject.repository.GameInfoRepository;
import com.claim.finalproject.repository.VoucherRepository;


@RestController
@CrossOrigin
public class VoucherController {
	
	@Autowired
	private VoucherRepository voRep;
	@Autowired
	private GameInfoRepository gameRep;
	
	@RequestMapping(value="/submitUserInfoDetails", method =RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public void submitUserInfoDetails(@RequestBody UserInfo userInfo) {
		this.voRep.save(userInfo);
	}
	
	@RequestMapping(value="/loggingIn",
			method =RequestMethod.POST, 
			consumes = MediaType.APPLICATION_JSON_VALUE)
	
	@ResponseBody
	private ResponseEntity<Optional<UserInfo>>loggingIn(@RequestBody UserInfo userInfo){
		Optional<UserInfo> users =voRep.findByEmail(userInfo.getEmail());
		Optional<UserInfo> UserInfo2 = users;
		//findById(userInfo.getEmail());
		System.out.println(UserInfo2.get().getPassword());
		if(UserInfo2.isPresent()) {
			if(UserInfo2.get().getPassword().equals(userInfo.getPassword())) {
				return new ResponseEntity<>(UserInfo2, HttpStatus.OK);
			}
			else {
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
			}
		}
		else {
			//student.orElseThrow();
			return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
		}
		
	}
	
	@RequestMapping(value="/submitWishList", method=RequestMethod.POST, consumes= MediaType.APPLICATION_JSON_VALUE)
	public void submitWishList(@RequestBody GameInfo gameInfo) {
		System.out.println(gameInfo.getId() + " " + gameInfo.getName());
		this.gameRep.save(gameInfo);
		
		
	}
	
	@RequestMapping(value="/getID",
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET
			 )
	@ResponseBody
	private ResponseEntity<Optional<UserInfo>>findId(String email){
		  Optional<UserInfo> user = voRep.findByEmail(email);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}
	
	@RequestMapping(value="/userGames",
			 produces=MediaType.APPLICATION_JSON_VALUE,
			 method= RequestMethod.GET
			 )
	@ResponseBody
	private ResponseEntity<List<GameInfo>>userGames(Long userID){
		System.out.println("I am running");
		
		List <GameInfo> games = gameRep.findAll();
		for(int i = 0; i < games.size(); i++) {
			if(games.get(i).getId() != userID) {
				games.remove(i);
				i = i-1;
			}
			
		}
		return new ResponseEntity<>(games, HttpStatus.OK);
	}
}
