// src/components/SaleOrderForm.js
import React from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Input, Button, VStack, FormLabel, FormControl, Select, Checkbox, HStack, Box } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { customers, products } from '../data/mockData';

const SaleOrderForm = ({ onClose, initialData, readOnly }) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: initialData || {
      customer_id: '',
      items: [{ sku_id: '', price: '', quantity: '' }],
      paid: false,
      invoice_date: new Date(),
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  });

  const onSubmit = (data) => {
    const newOrder = {
      ...data,
      invoice_no: `Invoice-${Math.floor(Math.random() * 1000000)}`,
    };
    // This should push to saleOrders or send to your API
    console.log('New Order:', newOrder);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <FormControl isReadOnly={readOnly}>
          <FormLabel>Customer</FormLabel>
          <Controller
            name="customer_id"
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder="Select customer">
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        {fields.map((item, index) => (
          <Box key={item.id} borderWidth="1px" borderRadius="lg" p={4} width="100%">
            <HStack spacing={4} alignItems="flex-end">
              <FormControl isReadOnly={readOnly}>
                <FormLabel>Product SKU</FormLabel>
                <Controller
                  name={`items[${index}].sku_id`}
                  control={control}
                  render={({ field }) => (
                    <Select {...field} placeholder="Select SKU">
                      {products.flatMap(product => product.sku).map((sku) => (
                        <option key={sku.id} value={sku.id}>
                          {sku.id} - {sku.amount} {sku.unit}
                        </option>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>

              <FormControl isReadOnly={readOnly}>
                <FormLabel>Price</FormLabel>
                <Controller
                  name={`items[${index}].price`}
                  control={control}
                  render={({ field }) => <Input type="number" {...field} />}
                />
              </FormControl>

              <FormControl isReadOnly={readOnly}>
                <FormLabel>Quantity</FormLabel>
                <Controller
                  name={`items[${index}].quantity`}
                  control={control}
                  render={({ field }) => <Input type="number" {...field} />}
                />
              </FormControl>

              {!readOnly && <Button onClick={() => remove(index)}>Remove</Button>}
            </HStack>
          </Box>
        ))}

        {!readOnly && <Button onClick={() => append({ sku_id: '', price: '', quantity: '' })}>Add Item</Button>}

        <FormControl isReadOnly={readOnly}>
          <FormLabel>Paid</FormLabel>
          <Controller
            name="paid"
            control={control}
            render={({ field }) => <Checkbox {...field}>Paid</Checkbox>}
          />
        </FormControl>

        <FormControl isReadOnly={readOnly}>
          <FormLabel>Invoice Date</FormLabel>
          <Controller
            name="invoice_date"
            control={control}
            render={({ field }) => <DatePicker {...field} selected={field.value} />}
          />
        </FormControl>

        {!readOnly && <Button type="submit" colorScheme="teal" width="full">Create Sale Order</Button>}
      </VStack>
    </form>
  );
};

export default SaleOrderForm;
