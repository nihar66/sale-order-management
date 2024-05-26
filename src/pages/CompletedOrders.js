// src/pages/CompletedOrders.js
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { saleOrders, customers, products } from '../data/mockData';

const CompletedOrders = () => {
  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : 'Unknown';
  };

  const getProductDetails = (skuId) => {
    const product = products.flatMap(product => product.sku).find(sku => sku.id === skuId);
    return product ? `${product.id} - ${product.amount} ${product.unit}` : 'Unknown';
  };

  return (
    <Table mt={4}>
      <Thead>
        <Tr>
          <Th>Invoice No</Th>
          <Th>Customer</Th>
          <Th>Items</Th>
          <Th>Paid</Th>
          <Th>Invoice Date</Th>
        </Tr>
      </Thead>
      <Tbody>
        {saleOrders.map((order) => (
          <Tr key={order.invoice_no}>
            <Td>{order.invoice_no}</Td>
            <Td>{getCustomerName(order.customer_id)}</Td>
            <Td>
              {order.items.map((item, index) => (
                <div key={index}>
                  {getProductDetails(item.sku_id)} - Price: {item.price} - Quantity: {item.quantity}
                </div>
              ))}
            </Td>
            <Td>{order.paid ? 'Yes' : 'No'}</Td>
            <Td>{order.invoice_date}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CompletedOrders;
