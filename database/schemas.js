import mongoose from 'mongoose';
const {Schema, model} = mongoose;

// Creación de esquemas

// Esquema user
const userSchema = new Schema({
    name: {type:String, required:true},
    last_name_1: {type:String, required:true},
    last_name_2: String,
    email: {type:String, required:true, unique:true},
    phone: String,
    birth_date: {type:Date, required:true},
    username: {type:String, required:true},
    password: {type:String, required:true},
    is_premium: {type:Boolean, required:true, default: false},
    photo: {type:String, required:true}
});

const negocioSchema = new Schema({
    user_id: {
        type:Schema.Types.ObjectId,
        ref: 'user'    
    },
    business_name: {type:String, required:true},
    description: {type:String, required:true},
    photo: String,
    tag: {type:String, required:true},
    banner: String,
    background_photo: String,
    color_top: {type:String, default:'#000000'},
    tag_color: {type:String, default:'#ffffff'},
    tag_color: {type:String, default:'#ffffff'},
    tag_font: {type:String, default: 'Roboto'},
    item_font: {type:String, default: 'Sans serif'},
});

const addressSchema = new Schema({
    negocio_id: {
        type:Schema.Types.ObjectId,
        ref:'negocio',
    },
    num_int: String,
    num_ext: String,
    city: {type: String, required:true},
    street: {type:String, required: true},
    zip_code: String,
    state: {type: String, required:true},
    country: {type: String, required:true},
});

const itemSchema = new Schema ({
    negocio_id: {
        type: Schema.Types.ObjectId,
        ref: 'negocio'
    },
    name: {type:String, required:true},
    price: String, 
    tag: {type:String, required:true}, 
    description: {type:String, required:true}, 
    photo: String, 
});

export { userSchema, negocioSchema, addressSchema, itemSchema };