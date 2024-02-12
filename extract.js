const path = require("path");
const fs = require("fs");
const yauzl = require("yauzl");
const Transform = require("stream").Transform;


const APP_ID = 'EUKAUnKtyVwphnAmfCbDoimbkKjswdTg';
const DIST_DIR = './dist/';
const OUTPUT_DIR = path.join(DIST_DIR, APP_ID)
const TEMP_DIR = path.join(DIST_DIR, 'temp/')

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

      zipfile.on("close", function() {
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

async function main() {

  if (fs.existsSync(OUTPUT_DIR)) {
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
  }

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

      console.log(`>> Extracting .zpk (device.zip) to '${OUTPUT_DIR}'`)
      await extract(path.join(tempDir, extratedFileName), OUTPUT_DIR, DEVICE_ZIP);
      
      // Rename device.zip to <app_id>.bin
      fs.renameSync(path.join(OUTPUT_DIR, DEVICE_ZIP), path.join(OUTPUT_DIR, `${APP_ID.slice(0, -4)}.bin`))
    }
  }

  console.log(">> Copying icon and info.xml...")
  fs.copyFileSync('assets/l66/icon.png', path.join(OUTPUT_DIR, 'icon.png'))
  fs.copyFileSync('infos.xml', path.join(OUTPUT_DIR, 'infos.xml'))

  console.log(">> Clean-up...")
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
}

main()
  .catch((err) => {
    console.error("ERROR!", err);
    process.exit(1);
  })