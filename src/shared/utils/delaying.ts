export const delaying = (timeout: number) =>
    new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
