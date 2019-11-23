function normalize_name(name) {
    const lower_name = name.toLowerCase();
    const sanitized_name = lower_name.replace(/[ -,]/g, "_");
    return sanitized_name;
}

module.exports = {
    normalize_name: normalize_name,
}