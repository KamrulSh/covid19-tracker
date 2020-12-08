export const sortData = (data) => {
    const allData = [...data];

    return allData.sort((a, b) => b.cases - a.cases);
};
