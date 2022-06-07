export const capitalize = (str) => { 

    return str[0].toUpperCase() + str.slice(1);
}


export const navigateTo = (window, navigate, route) => {
    window.scrollTo(0, 0)
    navigate(route)
}