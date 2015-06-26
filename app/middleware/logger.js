export default function loggerMiddleware(next) {
    return action => {
        next(action)
    }
}