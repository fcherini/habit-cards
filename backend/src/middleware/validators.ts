import { Request, Response, NextFunction } from "express";
import {
  CustomValidator,
  ValidationChain,
  body,
  param,
  validationResult,
} from "express-validator";
import mongoose from "mongoose";

export const validate = (validations: ValidationChain[] | ValidationChain) => {
  //TODO escape htlm injections

  return async (req: Request, res: Response, next: NextFunction) => {
    if (Array.isArray(validations)) {
      await Promise.all(validations.map((validation) => validation.run(req)));
    } else await validations.run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  };
};

//custom validators
export const isValidObjectId: CustomValidator = (id: string): boolean => {
  return mongoose.Types.ObjectId.isValid(id);
};

export const isValidEnumValue: (
  enumObject: Record<string, string>
) => CustomValidator = (enumObject) => {
  const enumValues = Object.values(enumObject);
  return (value) => {
    if (!enumValues.includes(value)) {
      throw new Error(`Unaccepted value "${value}" passed`);
    }
    return true;
  };
};

//validation chains
export const checkString = (
  field: string,
  optional?: boolean
): ValidationChain => {
  const message = optional ? "cannot be blank" : "is required";
  let chain = body(field)
    .notEmpty()
    .withMessage(`${field} ${message}`)
    .escape()
    .withMessage("Invalid value inserted");
  if (optional) {
    chain = chain.optional();
  }
  return chain;
};

export const checkInt = (
  field: string,
  optional?: boolean
): ValidationChain => {
  let chain = body(field)
    .isInt({ gt: 0 })
    .withMessage(`${field} must be higher than zero`);

  if (optional) {
    chain = chain.optional();
  }
  return chain;
};

export const checkId = (): ValidationChain =>
  param("id")
    .notEmpty()
    .escape()
    .custom(isValidObjectId)
    .withMessage("Invalid id");

export const checkEmail = (
  field: string,
  optional?: boolean
): ValidationChain =>
  checkString(field, optional).isEmail().withMessage("Invalid email");

//TODO improve enum type
export const checkEnum = (
  field: string,
  enumObj: any,
  optional?: boolean
): ValidationChain => {
  let chain = body(field).notEmpty().custom(isValidEnumValue(enumObj));
  if (optional) {
    chain = chain.optional();
  }
  return chain;
};
