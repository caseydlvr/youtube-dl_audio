# youtube-dl_audio
A Node command line program that for downloading YouTube video audio to a folder. This is a time saving wrapper for [youtube-dl](https://ytdl-org.github.io/youtube-dl/index.html).

The script is currently built to handle a specific workflow of creating a directory, then downloading the video audio in two formats to that directory. However, I am currently working to make the script more generic and configurable.

This script has only been tested on macOS, but it should work on any platform as the file handling related functions and libraries are cross-platform.

## Usage
`node youtube-dl_audio.js YOUTUBE_VIDEO_ID DIRECTORY_NAME`

## Function

Current algorithm:

1. Sanitize the DIRECTORY_NAME arg
1. Create a directory with the specified name (DIRECTORY_NAME arg) in the current working directory. This created directory is where the audio tracks are saved.
1. Use youtube-dl to download the specified video's (YOUTUBE_VIDEO_ID) audio in mp3 format (highest VBR quality) to the save directory
1. Use youtube-dl to download the specified video's (YOUTUBE_VIDEO_ID) audio in 'best' format (typically the unadultered video audio track) to the save directory
1. Deletes any leftover image files in the save directory
   * Leftover image files happen when the 'best' audio format doesn't support embedded thumbnails (youtube-dl errors out before cleaning up the downloaded thumbnail in this case, at least as currently configured)

The command line output from this script is all from youtube-dl.

Note: `ERROR: Only mp3 and m4a/mp4 are supported for thumbnail embedding for now.` is expected output. This is youtube-dl output that occurs when the 'best' audio format isn't compatible with embedded thumbnails.

## Dependencies

- youtube-dl available in $PATH (or the same folder as youtube-dl_audio.js)
- ffmpeg (used by youtube-dl for transcoding)
- atomicparsley (used by youtube-dl for embedding thumbnails and metadata)

### installing dependencies on macOS (using homebrew)

- `brew install youtube-dl`
- `brew install ffmpeg`
- `brew install atomicparsley`

## TODO

- Make file handling code platform agnostic
 - Cross platform directory name sanitation
- Allow configuring (via .env) youtube-dl location, rather than requiring youtube-dl to be in $PATH (or the same folder as youtube-dl_audio.js)
- Make FOLDER_NAME arg optional (save to current working directory rather than creating a folder)
- Allow specifying a full (and/or existing) save path, rather than only saving based on the current working directory
- Investigate configuring youtube-dl to only download the video file once, rather than redownloading the video for every desired audio format (alternatively, only use youtube-dl to download the video, then manually call ffmpeg to do the desired audio track extraction and transcoding)
- Allow configuring (via .env) audio formats and quality
