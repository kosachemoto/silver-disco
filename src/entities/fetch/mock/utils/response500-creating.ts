export const response500Creating = () =>
    new Response(
        JSON.stringify({
            error: {
                id: 'common.500',
                message: 'Internal Server Error',
            },
        }),
        { status: 500 }
    );
