export const modifyPackageVersion = (
  packageJson,
  packageName,
  packageVersion
) => {
  const updatedObject = JSON.parse(JSON.stringify(packageJson));

  if (updatedObject["dependencies"][packageName]) {
    updatedObject["dependencies"][packageName] = packageVersion;
  } else if (updatedObject["devDependencies"][packageName]) {
    updatedObject["devDependencies"][packageName] = packageVersion;
  } else {
    return;
  }
  return JSON.stringify(updatedObject, null, 4);
};
