package com.api.finance_pro.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/check")
public class CheckController {

    @RequestMapping("/health")
    public String health() {return "OK";}

}
