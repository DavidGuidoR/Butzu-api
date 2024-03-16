import {check} from "express-validator"

export const createBusinessValidations = [
    check('user_id').notEmpty(),
    check('business_name').notEmpty().isString(),
    check('description').notEmpty().isString(),
    check('tag').notEmpty().isString(),
    check('color_top').optional().isHexColor(),
    check('tag_color').optional().isHexColor(),
    check('tag_font').optional().isString(),
    check('item_font').optional().isString(),
    check('num_int').notEmpty().isString(),
    check('num_ext').optional().isString(),  
    check('city').optional().isString(),
    check('street').notEmpty().isString(),
    check('zip_code').optional().isString(),
    check('state').notEmpty().isString(),
    check('country').notEmpty().isString(),
];

export default createBusinessValidations;

