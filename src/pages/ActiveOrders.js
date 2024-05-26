// src/pages/ActiveOrders.js
import React, { useState } from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'; // Removed ModalFooter
import SaleOrderForm from '../components/SaleOrderForm';
import { saleOrders, customers, products } from '../data/mockData';

const ActiveOrders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleEdit = (order) => {
    setEditData(order);
    setIsEditing(true);
    onOpen();
  };

  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : 'Unknown';
  };

  const getProductDetails = (skuId) => {
    const product = products.flatMap(product => product.sku).find(sku => sku.id === skuId);
    return product ? `${product.id} - ${product.amount} ${product.unit}` : 'Unknown';
  };

  return (
    <div>
      <Button onClick={() => { setIsEditing(false); onOpen(); }} colorScheme="teal">+ Sale Order</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SaleOrderForm onClose={onClose} initialData={isEditing ? editData : null} readOnly={isEditing && !editData} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Table mt={4}>
        <Thead>
          <Tr>
            <Th>Invoice No</Th>
            <Th>Customer</Th>
            <Th>Items</Th>
            <Th>Paid</Th>
            <Th>Invoice Date</Th>
            <Th>Actions</Th>
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
              <Td>
                <Button onClick={() => handleEdit(order)}>...</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default ActiveOrders;
