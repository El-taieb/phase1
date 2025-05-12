'use strict';

async function routes(fastify, options) {
  fastify.get('/products', async (request, reply) => {
    return [
      { id: 1, name: 'Brake Pads', price: 450 },
      { id: 2, name: 'Test Product', price: 99.99 }
    ];
  });
}

module.exports = routes; // ✅ MUST be a function
