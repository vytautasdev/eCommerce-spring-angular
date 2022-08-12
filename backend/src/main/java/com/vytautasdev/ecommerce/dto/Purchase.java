package com.vytautasdev.ecommerce.dto;

import com.vytautasdev.ecommerce.entity.Address;
import com.vytautasdev.ecommerce.entity.Customer;
import com.vytautasdev.ecommerce.entity.Order;
import com.vytautasdev.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;

    private Address shippingAddress;

    private Address billingAddress;

    private Order order;

    private Set<OrderItem> orderItems;
}
