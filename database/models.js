// models.js
import mongoose from 'mongoose';
import { userSchema, negocioSchema, addressSchema, itemSchema } from './schemas.js';

const User = mongoose.model('User', userSchema);
const Negocio = mongoose.model('Negocio', negocioSchema);
const Address = mongoose.model('Address', addressSchema);
const Item = mongoose.model('Item', itemSchema);

export { User, Negocio, Address, Item };

