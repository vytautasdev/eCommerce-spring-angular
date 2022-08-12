package com.vytautasdev.ecommerce.controller;

import com.vytautasdev.ecommerce.dto.Purchase;
import com.vytautasdev.ecommerce.dto.PurchaseResponse;
import com.vytautasdev.ecommerce.service.CheckoutService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {

    private CheckoutService checkoutService;

    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase) {

        return checkoutService.placeOrder(purchase);
    }
}
