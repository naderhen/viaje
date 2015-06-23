export default function loggerMiddleware(next) {
    return action => {
        console.log('log action middleware', action);
        next(action);
    };
}