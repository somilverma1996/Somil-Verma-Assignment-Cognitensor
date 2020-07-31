import Chart from "../views/chart"

const indexRoutes = [
    { path: "/chart", component: Chart },
    { redirect: true, path: "/", to: "/chart", navbarName: "Redirect" }
];

export default indexRoutes;