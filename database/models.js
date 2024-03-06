// models.js
const mongoose = require('mongoose');
const { userSchema, negocioSchema, addressSchema, itemSchema } = require('./schemas');

const User = mongoose.model('User', userSchema);
const Negocio = mongoose.model('Negocio', negocioSchema);
const Address = mongoose.model('Address', addressSchema);
const Item = mongoose.model('Item', itemSchema);

module.exports = { User, Negocio, Address, Item };
