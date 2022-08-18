package com.vytautasdev.ecommerce.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.vytautasdev.ecommerce.dto.PaymentInfo;
import com.vytautasdev.ecommerce.dto.Purchase;
import com.vytautasdev.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {

    PurchaseResponse placeOrder(Purchase purchase);

    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
