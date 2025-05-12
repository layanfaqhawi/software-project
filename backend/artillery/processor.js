module.exports = {
  getDashboardRoute: function (userContext, events, done) {
    const role = userContext.vars.role;
    let route = "/user/studentDashboard";
    if (role === "instructor") route = "/user/instructorDashboard";
    if (role === "admin") route = "/user/adminDashboard";
    userContext.vars.dashboardRoute = route;
    return done();
  }
};
