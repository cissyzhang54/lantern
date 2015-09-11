import config from "../config";
let check = identifier => !!config.features[identifier];
export default {check}
