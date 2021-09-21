import cacheModel from '../models/cache.models';

/**
 * All query functions
 */
export const findAllKeys = (condition,project) => cacheModel.find(condition, project);

export const countAllKeys = () => cacheModel.count();

export const findAKey = (conditions, options) => {
    return cacheModel.findOne(conditions, null, options);
}
export const updateAkey = (conditions, data) => {
    return cacheModel.updateOne(conditions, { $set: data });
}
export const createAkey = (data) => {
    return cacheModel.create(data);
}
//upsert
export const findAndUpdate = (conditions, data, options) => {
    return cacheModel.findOneAndUpdate(conditions, { $set: data }, { sort: options });
}
//deletes one or all keys
export const deleteKey = (condition) => {
    return cacheModel.deleteMany(condition);
}


