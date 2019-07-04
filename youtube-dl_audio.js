#!/usr/bin/env node

const fs = require('fs');
const child_process = require('child_process');
const { extname } = require('path');

const YOUTUBEDL = 'youtube-dl';
const MP3_ARGS = ['--audio-format', 'mp3', '--audio-quality', '0'];
const BEST_ARGS = ['--audio-format', 'best'];
const ALL_ARGS = ['-x', '-i', '--embed-thumbnail'];

const fixDirName = dirName => {
  return dirName.replace(/\//g, ', ');
}

const getPath = dirName => {
  return `${ process.cwd() }/${dirName}`;
}

const makeDir = path => {
  fs.mkdirSync(path);
}

const runCmd = (cmd, args, path) => {
  child_process.spawnSync(cmd, args, { cwd: path, stdio: 'inherit' });
}

const dlMp3 = (videoId, path) => {
  runCmd(YOUTUBEDL, [videoId, ...ALL_ARGS, ...MP3_ARGS], path);
}

const dlBest = (videoId, path) => {
  runCmd(YOUTUBEDL, [videoId, ...ALL_ARGS, ...BEST_ARGS], path);
}

const cleanup = path => {
  const imgExts = ['.jpg', '.png', '.bmp', '.png'];
  const files = fs.readdirSync(path);
  const imgFiles = files.filter(file => imgExts.some(ext => extname(file) === ext));
  imgFiles.forEach(file => fs.unlinkSync(`${path}/${file}`));
}

const main = () => {
  const [,, videoId, dirName] = process.argv;
  const path = getPath(fixDirName(dirName));

  makeDir(path);
  dlMp3(videoId, path);
  dlBest(videoId, path);
  cleanup(path);
}

main();