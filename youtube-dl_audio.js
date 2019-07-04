#!/usr/bin/env node

const fs = require('fs');
const child_process = require('child_process');
const path = require('path');

const YOUTUBEDL = 'youtube-dl';
const MP3_ARGS = ['--audio-format', 'mp3', '--audio-quality', '0'];
const BEST_ARGS = ['--audio-format', 'best'];
const ALL_ARGS = ['-x', '-i', '--embed-thumbnail'];

const fixDirName = dirName => {
  return dirName.replace(/\//g, ', ');
}

const buildSavePath = dirName => {
  return `${ process.cwd() }/${dirName}`;
}

const makeDir = savePath => {
  fs.mkdirSync(savePath);
}

const runCmd = (cmd, args, savePath) => {
  child_process.spawnSync(cmd, args, { cwd: savePath, stdio: 'inherit' });
}

const dlMp3 = (videoId, savePath) => {
  runCmd(YOUTUBEDL, [videoId, ...ALL_ARGS, ...MP3_ARGS], savePath);
}

const dlBest = (videoId, savePath) => {
  runCmd(YOUTUBEDL, [videoId, ...ALL_ARGS, ...BEST_ARGS], savePath);
}

const cleanup = savePath => {
  const imgExts = ['.jpg', '.png', '.bmp', '.png'];
  const files = fs.readdirSync(savePath);
  const imgFiles = files.filter(file => imgExts.some(ext => path.extname(file) === ext));
  imgFiles.forEach(file => fs.unlinkSync(`${savePath}/${file}`));
}

const main = () => {
  const [,, videoId, dirName] = process.argv;
  const savePath = buildSavePath(fixDirName(dirName));

  makeDir(savePath);
  dlMp3(videoId, savePath);
  dlBest(videoId, savePath);
  cleanup(savePath);
}

main();