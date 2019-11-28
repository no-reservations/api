"use strict";

function sanitize_name(name) {
    const short_name = name.replace(/['"]/g, "");
    return short_name.replace(/[ _,]/g, "-");
}

module.exports = {
    normalize_name: sanitize_name,
}