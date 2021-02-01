import axios from "axios";

export const dataRequest = axios.create({
  baseURL:
    "https://api.github.com/repos/jhonatanmacazana/vscode-boilerplates/contents",
  headers: { "User-Agent": "jmnew node app" },
});

export const contentRequest = axios.create({
  baseURL:
    "https://raw.githubusercontent.com/jhonatanmacazana/vscode-boilerplates/contents",
  headers: { "User-Agent": "jmnew node app" },
});

export default { dataRequest, contentRequest };
