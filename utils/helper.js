import { v4 as uuidv4 } from 'uuid';
import consts from '../static/constants';

const genUUID = () => uuidv4();
/** Check whether the given data is Error type */
const isError = (obj) => {
	return Object.prototype.toString.call(obj).indexOf("Error") !== -1;
};

/** Check whether the given data is object type */
const isObject = (obj) => {
	return Object.prototype.toString.call(obj).indexOf(consts.TYPE.OBJECT) !== -1;
};
export default { isError, isObject, genUUID }