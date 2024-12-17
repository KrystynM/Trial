import axios from "axios";
import promptSync from "prompt-sync";
import {
  fetchFile,
  createBranch,
  uploadFile,
  createMergeRequest,
} from "./bitbucketApis.js";
import { modifyPackageVersion } from "./modifyPackageVersion.js";

const prompt = promptSync();

const setAxiosConfig = (token, workspace, slug) => {
  axios.defaults.baseURL = `https://api.bitbucket.org/2.0/repositories/${workspace}/${slug}`;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const main = async () => {
  const packageName = prompt("What is a package name? ");
  const packageVersion = Number(prompt("What is a package version? "));

  if (!packageVersion) {
    return;
  }

  const workspace = prompt("What is a workspace name? ");
  const slug = prompt("What is a repository slug? ");
  const token = prompt("What is a token? ");

  setAxiosConfig(token, workspace, slug);

  try {
    const file = await fetchFile();
    console.log(file);
    const modifiedFile = modifyPackageVersion(
      file,
      packageName,
      packageVersion
    );

    if (!modifiedFile) {
      console.log(`Package with name "${packageName}" not found`);
      return;
    }

    await createBranch();
    await uploadFile(modifiedFile);
    await createMergeRequest();
  } catch (error) {
    console.log(error);
  }
};

main();
