export default ({env}) => ({
    'user-permissions': {
        config: {
            jwtSecret: env('JWT_SECRET'),
        }
    }
});
