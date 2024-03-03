const path = require("path");
const fs = require("fs");
const Transform = require("stream").Transform;

const yazl = require("yazl");
const yauzl = require("yauzl");

const APP_ID = 'MjAyNDAzMDMxOTU4NTYuemFi';
const DIST_DIR = './dist/';
const OUTPUT_DIR = path.join(__dirname, "./output")
const TEMP_DIR = path.join(DIST_DIR, 'temp/')

/**
 * Make directory recursively
 * @param {string} dir
 * @param {() => {}} cb
 * @returns
 */
function mkdirp(dir, cb) {
  if (dir === ".") return cb();
  fs.stat(dir, function (err) {
    if (err == null) return cb(); // already exists

    var parent = path.dirname(dir);
    mkdirp(parent, function () {
      process.stdout.write(dir.replace(/\/$/, "") + "/\n");
      fs.mkdir(dir, cb);
    });
  });
}

/**
 * Extract a zip file to output directory.
 * @param {string} zipFilePath
 * @param {string} outputDir
 * @param {Regex | null} filterFile
 */
function extract(zipFilePath, outputDir, filterFile = null) {
  return new Promise((resolve, reject) => {
    yauzl.open(zipFilePath, { lazyEntries: true, autoClose: true },
      (err, zipfile) => {
        if (err) {
          return reject(err);
        }

        zipfile.on("close", function () {
          resolve();
        });

        zipfile.readEntry();
        zipfile.on("entry", function (entry) {
          if (!!filterFile) {
            if (!filterFile.includes(entry.fileName)) {
              zipfile.readEntry();
              return;
            }
          }

          if (/\/$/.test(entry.fileName)) {
            // directory file names end with '/'
            mkdirp(entry.fileName, () => {
              if (err) {
                return reject(err);
              }
              zipfile.readEntry();
            });
          } else {
            var extractedFileOutput = path.join(outputDir, entry.fileName);
            mkdirp(path.dirname(extractedFileOutput), function () {
              zipfile.openReadStream(entry, function (err, readStream) {
                if (err) {
                  return reject(err)
                }
                var byteCount = 0;
                var writeStream = fs.createWriteStream(extractedFileOutput);
                var filter = new Transform();
                filter._transform = function (chunk, encoding, cb) {
                  byteCount += chunk.length;
                  cb(null, chunk);
                };
                filter._flush = function (cb) {
                  cb();
                  zipfile.readEntry();
                };
                // writeStream.on("close", decrementHandleCount);
                readStream.pipe(filter).pipe(writeStream);
              });
            });
          }
        });
      });
  });
}


function zipFolder(folderPath, outputZipPath) {
  return new Promise((resolve, reject) => {
    var zipfile = new yazl.ZipFile();

    const files = fs.readdirSync(folderPath, { recursive: true });
    for (let i = 0; i < files.length; i++) {
      const fileName = files[i];
      const fullPath = path.join(folderPath, fileName);

      if (fs.lstatSync(fullPath).isDirectory()) {
        continue;
      }

      zipfile.addFile(fullPath, fileName);
    }

    zipfile.outputStream.pipe(fs.createWriteStream(outputZipPath)).on("close", function() {
        resolve();
    });

    zipfile.end();
  });
}

async function main() {

  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(OUTPUT_DIR);


  // Create temp directory
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(TEMP_DIR);

  const DEVICE_ZIP = "device.zip";

  const files = fs.readdirSync(DIST_DIR);
  for (let i = 0; i < files.length; i++) {
    const fileName = files[i];
    if (path.extname(fileName) !== ".zab") {
      continue;
    }

    // Extracting .zab file
    var tempDir = path.join(TEMP_DIR, path.basename(fileName).slice(0, -4));
    console.log(`>> Extracting .zab to '${tempDir}'`)
    await extract(path.join(DIST_DIR, fileName), tempDir);

    // Extracing device.zip from .zpk file
    const extractedFiles = fs.readdirSync(tempDir);
    for (let j = 0; j < extractedFiles.length; j++) {
      const extratedFileName = extractedFiles[j];
      if (path.extname(extratedFileName) !== ".zpk") {
        continue;
      }

      const deviceFolder = `${tempDir}/device`;

      console.log(`>> Extracting .zpk (device.zip) to '${tempDir}'`)
      await extract(path.join(tempDir, extratedFileName), tempDir, DEVICE_ZIP);

      // Extract device.zip
      console.log(`>> Extracting device.zip to '${deviceFolder}'`)
      await extract(path.join(tempDir, DEVICE_ZIP), deviceFolder);

      console.log(">> Copying preview image and info.xml...");
      fs.copyFileSync(`assets/l66/preview.png`, path.join(deviceFolder, 'assets/preview.png'));
      fs.copyFileSync('../../infos.xml', path.join(deviceFolder, 'infos.xml'))

      console.log(">> Zipping bin file");
      await zipFolder(deviceFolder, path.join(OUTPUT_DIR, `${APP_ID.slice(0, -4)}.bin`))
      // Rename device.zip to <app_id>.bin
      // fs.renameSync(path.join(OUTPUT_DIR, DEVICE_ZIP), path.join(OUTPUT_DIR, `${APP_ID.slice(0, -4)}.bin`))
    }
  }

  // console.log(">> Copying icon and info.xml...")
  // fs.copyFileSync(`${PROJECT_DIR}/assets/l66/preview.png`, path.join(OUTPUT_DIR, 'preview.png'))
  // fs.copyFileSync('infos.xml', path.join(OUTPUT_DIR, 'infos.xml'))

  console.log(">> Clean-up...")
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
}

main()
  .catch((err) => {
    console.error("ERROR!", err);
    process.exit(1);
  })
