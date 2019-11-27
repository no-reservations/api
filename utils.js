function normalize_name(name) {
    return name.replace(/[ -,]/g, "_");
}

module.exports = {
    normalize_name: normalize_name,
}