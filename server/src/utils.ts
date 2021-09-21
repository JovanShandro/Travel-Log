export const promise = async (pr: Promise<any>): Promise<[any, any]> => {
  try {
    const data = await pr;
    return [null, data];
  } catch (e) {
    return [e, null];
  }
};
