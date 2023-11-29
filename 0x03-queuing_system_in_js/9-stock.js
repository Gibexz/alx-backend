const express = require('express');
const redis = require('redis');
// const request = require('request');
const { promisify } = require('util');

const client = redis.createClient();

const app = express();
const port = 1245;

const listProducts = [
  {
    itemId: 1, itemName: 'Suitcase 250', price: 50, initialAvailableQuantity: 4,
  },
  {
    itemId: 2, itemName: 'Suitcase 450', price: 100, initialAvailableQuantity: 10,
  },
  {
    itemId: 3, itemName: 'Suitcase 650', price: 350, initialAvailableQuantity: 2,
  },
  {
    itemId: 4, itemName: 'Suitcase 1050', price: 550, initialAvailableQuantity: 5,
  },
];

const reserveStockById = (itemId, stock) => {
  client.set(`item.${itemId}`, stock);
};

const getCurrentReservedStockById = async (itemId) => {
  const stock = await promisify(client.get).bind(client)(`item.${itemId}`);
  return stock ? parseInt(stock, 10) : 0;
};

const getItemById = (id) => {
  const item = listProducts.find((product) => product.itemId === id);

  return item;
};

app.get('/list_products', (req, res) => {
  res.json(listProducts);
});

app.get('/list_products/:itemId', async (req, res) => {
  const _id = parseInt(req.params.itemId, 10);
  // res.json(getCurrentReservedStockById(_id));
  const product = getItemById(_id);
  // res.json(product);
  if (!product) {
    res.json({ status: 'Product not found' });
    return;
  }
  const reserved = await getCurrentReservedStockById(_id);
  if (product.initialAvailableQuantity > reserved) {
    const currentQuantity = product.initialAvailableQuantity - reserved;

    const response = {
      itemId: product.itemId,
      itemName: product.itemName,
      price: product.price,
      initialAvailableQuantity: product.initialAvailableQuantity,
      currentQuantity,
    };
    res.json(response);
  } else {
    const response = {
      itemId: product.itemId,
      itemName: product.itemName,
      price: product.price,
      initialAvailableQuantity: product.initialAvailableQuantity,
      currentQuantity: 0,
    };
    res.json(response);
  }
});

app.get('/reserve_product/:itemId', async (req, res) => {
  const _id = parseInt(req.params.itemId, 10);
  const product = getItemById(_id);
  const reserved = await getCurrentReservedStockById(_id);

  if (!product) {
    res.json({ status: 'Product not found' });
  } else if ((product.initialAvailableQuantity - reserved) <= 0) {
    const response = {
      status: 'Not enough stock available',
      itemId: product.itemId,
    };
    res.json(response);
  } else {
    reserveStockById(_id, reserved + 1);
    res.json({ status: 'Reservation confirmed', itemId: _id });
  }
});

app.listen(port);
