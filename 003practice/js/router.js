/**
 * Created by Heliuer on 2016/4/29.
 */
(function (app, Router) {
    var router = new Router();
        ['all', 'active', 'completed'].forEach(function (visibility) {
        router.on(visibility, function () {
            app.visibility = visibility;
        });
    });
    router.configure({
        notFound: function () {
            window.location.hash = ""
            app.visibility = "all"
        }
    })
    router.init()
})(app, Router)