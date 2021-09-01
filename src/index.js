/* eslint-disable prettier/prettier */
const path = require("path");
const golb = require("glob");
const chalk = require("chalk");
const ora = require("ora");
const spinner = ora({
  color: 'green'
})
const { writeTempDirectory, zipDirectory } = require("./zipUtils");
const UserHook = require("./hook");

class UploadMapFilePlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const zipHook = new UserHook(compiler);
    zipHook.addSyncHook("zipDone", ["url"])
    compiler.hooks.done.tap("upload-sourcemap-plugin", async (status) => {
      const basePath = status.compilation.outputOptions.path;
      console.log(chalk.green('Start finding the. Map file'));
      spinner.start();
      const files = golb.sync(
        path.join(basePath, `./**/*.{js.map,}`)
      );
      console.log(chalk.blue(`A total of ${files.length} files were found`));
      spinner.stop();
      console.log(chalk.green('Start compressing folder'));
      spinner.start();
      const tempDir = await writeTempDirectory(files, basePath);
      const zipUrl = await zipDirectory(tempDir);
      console.log(chalk.green('Compression complete'));
      spinner.stop();
      zipHook.emitHook("zipDone", [zipUrl])
    });
  }
}

module.exports = UploadMapFilePlugin;
