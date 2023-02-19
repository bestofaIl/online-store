export const paginate = (currentPage, items, pageSize) => {
    const startIndex = (currentPage - 1) * pageSize;
    return [...items].splice(startIndex, pageSize);
};
