/* eslint-disable prettier/prettier */
const fs = require("fs");
const compressing = require('compressing');
const chalk = require("chalk");

async function writeTempDirectory(files, path) {
  path = `${path}\\zip-temp`;
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  files.forEach(file => {
    const rs = fs.createReadStream(file);
    const name = file.replace(/(.*\/)*([^.]+)/i,"$2");
    const ws = fs.createWriteStream(`${path}/${name}`);
    rs.pipe(ws);
  })
  return path;
}

async function zipDirectory(path, name = "temp.tar") {
  await compressing.tar.compressDir(path, `${path}.${name}`);
  fs.rmSync(path, {recursive: true});
  console.log(chalk.green(`Compressed file address: ${path}.${name}`));
  return `${path}.${name}`;
}

module.exports = {
  writeTempDirectory,
  zipDirectory
}