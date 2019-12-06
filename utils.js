"use strict";

function sanitize_name(name) {
    const short_name = name.replace(/['"]/g, "");
    return short_name.replace(/[ _,]/g, "-");
}

function capitalize(str) {
    return str
        .toLowerCase()
        .replace(
            /(?:^|\s)\S/g, 
            a => a.toUpperCase()
        );
};

module.exports = {
    capitalize: capitalize,
    sanitize: sanitize_name,
}