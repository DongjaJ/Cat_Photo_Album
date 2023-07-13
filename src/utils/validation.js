/**
 * Validation
 *
 * isRoot : boolean
 * isLoading: boolean
 * nodes: array - node: object {id: string, name: string, type: string}
 * paths: array - path(path): object {id: string, name: string, type: string}
 * selectedImageUrl: null | string
 */

const isBoolean = (parameter) => typeof parameter === 'boolean';
const isArray = (parameter) => Array.isArray(parameter);
const isNullish = (parameter) => parameter == null;
const isString = (parameter) => typeof parameter === 'string';

const validateFunction = {
  BOOLEAN: isBoolean,
  ARRAY: isArray,
  NULLISH: isNullish,
  STRING: isString,
};

export function validate({ types, parameter, parameterName }) {
  const isValid = types.some((type) => {
    return validateFunction?.[type](parameter);
  });
  if (!isValid) throw new Error(`${parameterName} is inValid!`);
}

export function validateNodeArray({ nodeArray, nodeArrayName }) {
  validate({
    types: ['ARRAY'],
    parameter: nodeArray,
    parameterName: nodeArrayName,
  }) && nodeArray.forEach(validateNode);
}

export function validateNode({ id, name, type }) {
  [id, name, type].forEach((parameter) =>
    validate({
      types: ['STRING'],
      parameter,
      parameterName: Object.keys({ parameter })[0],
    })
  );
}
