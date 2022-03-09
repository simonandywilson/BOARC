require("./src/styles/global.css");

exports.onRouteUpdate = ({ location, prevLocation }) => {
    window.currentPath = location.pathname;
    window.previousPath = prevLocation ? prevLocation.pathname : null;
};
