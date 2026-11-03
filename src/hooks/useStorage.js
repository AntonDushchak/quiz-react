export function useStorage() {
    const results = JSON.parse(localStorage.getItem("results")) ?? [];

    const addResult = (result) =>
        localStorage.setItem("results", JSON.stringify([...results, result]));

    return { results, addResult };
}

export default useStorage;
