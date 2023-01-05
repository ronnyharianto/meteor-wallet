const isValidBound = (value, lower) => !value || (Number.isSafeInteger(value) && value > lower);
const idOfLength = (min, max) => {
    if (!isValidBound(min, 0)) throw new Error(`Expected a non-negative safe integer, got ${min}`);
    if (!isValidBound(max, min)) throw new Error(`Expected a non-negative safe integer greater than 1 and greater than min, got ${max}`);
    let bounds;
    if (min && max) bounds = `${min},${max}`;
    else if (min && max === null) bounds = `${min},`;
    else if (min && !max) bounds = `${min}`;
    else if (!min && !max) bounds = '0,';
    else throw new Error(`Unexpected state for min (${min}) and max (${max})`);
    return new RegExp(`^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{${bounds}}$`);
};

const RegEx = {
    Email: new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/),
    Id: idOfLength(17),
}