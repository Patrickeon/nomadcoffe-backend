export const processCategories = caption => {
  const categorys = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
  return categorys.map(category => ({
    where: { category },
    create: { category },
  }));
};
