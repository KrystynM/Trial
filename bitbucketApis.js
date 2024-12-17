import axios from "axios";

const BRANCH_NAME = "update_package_version";

export const fetchFile = async () => {
  const url = `src/main/package.json`;

  try {
    const fileResponse = await axios.get(url);
    console.log("File fetched");
    return fileResponse.data;
  } catch (error) {
    console.log(error);
  }
};

export const createBranch = async () => {
  const url = `refs/branches`;

  try {
    await axios.post(url, {
      name: BRANCH_NAME,
      target: {
        hash: "main",
      },
    });
    console.log("Branch created");
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = async (file) => {
  const url = `src`;

  try {
    const formData = new URLSearchParams();
    formData.append("message", "Update package.json library version");
    formData.append("branch", BRANCH_NAME);
    formData.append("package.json", file);

    await axios.post(url, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("File uploaded");
  } catch (error) {
    console.log(error);
  }
};

export const createMergeRequest = async () => {
  const url = `/pullrequests`;

  try {
    await axios.post(
      url,
      {
        title: "Update package.json library version",
        source: {
          branch: {
            name: BRANCH_NAME,
          },
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    console.log("Merge created");
  } catch (error) {
    console.log(error);
  }
};
