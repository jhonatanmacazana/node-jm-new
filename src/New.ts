const fs = require("fs");

import { dataRequest, contentRequest } from "./api";

interface MyError extends Error {
  statusCode?: number;
}

interface GithubContentsResponse {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: string;
  _links: [Object];
}

interface OptionsArgs {
  type: string;
  writable: string;
}

const New: any = {};

New.getTypes = async () => {
  const types: string[] = [];

  try {
    const res = await dataRequest.get("/");
    if (res.status !== 200) {
      let err: MyError = new Error("somethingWentWrong");
      err.statusCode = res.status;
      throw err;
    }

    const filesOnRepo: GithubContentsResponse[] = res.data;

    filesOnRepo.forEach(fileOnRepo => {
      const name = fileOnRepo.name;
      if (fileOnRepo.type != "dir") return;
      types.push(name);
    });
  } catch (err) {
    throw err;
  }

  return types;
};

New.writeTemplate = async ({ type, writable }: OptionsArgs) => {
  let file = fs.createWriteStream(".gitignore", { flags: "a" });
  const types: string[] = [];
  if (!type) {
    throw new Error("noTypeProvided");
  }
  if (!file && !writable) {
    throw new Error("noWritableProvided");
  }

  try {
    const res = await contentRequest.get("/");
    if (res.status !== 200) {
      let err: MyError = new Error("somethingWentWrong");
      err.statusCode = res.status;
      throw err;
    }

    const filesOnRepo: GithubContentsResponse[] = res.data;

    filesOnRepo.forEach(fileOnRepo => {
      const name = fileOnRepo.name;
      if (fileOnRepo.type != "dir") return;
      types.push(name);
    });
  } catch (err) {
    throw err;
  }

  return types;
};

export default New;
