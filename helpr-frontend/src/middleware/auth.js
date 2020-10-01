export default function auth(to, from, next) {
    const userIsAuthorized = true;
    if (userIsAuthorized) {
        return next();
    } else {
        return next({ name: 'Landing'});
    }
}
