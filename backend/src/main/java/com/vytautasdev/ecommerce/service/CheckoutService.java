package com.vytautasdev.ecommerce.service;

import com.vytautasdev.ecommerce.dto.Purchase;
import com.vytautasdev.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);
}
