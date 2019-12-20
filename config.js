// TODO: Define this guy via env var
exports.JWT_SECRET_KEY = "S3CR3T_K3YS_4_DAYS";
exports.DEBUG = process.env.DEBUG || true;
exports.PORT = process.env.TEST ? 8000 : process.env.PORT || 8080;
exports.DB_NAME = process.env.DB_NAME