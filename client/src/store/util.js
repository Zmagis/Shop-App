export const updateObject = (oldObject, valueToUpdate) => {
  return {
    ...oldObject,
    ...valueToUpdate,
  };
};
