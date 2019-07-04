# youtube-dl_audio
youtube-dl wrapper for downloading audio to a folder.

Creates the a folder with the specified name in the current working directory. Extracts the video audio to both MP3 (highest VBR quality) and 'best' format (typically the unadultered video audio track) to the created folder. Video thumbnail is embedded into the audio tracks, when possible. 

## Usage
`node youtube-dl_audio.js YOUTUBE_VIDEO_ID FOLDER_NAME`

## Dependencies

- youtube-dl available in $PATH
- ffmpeg (for transcoding)
- atomicparsley (for embedding thumbnail)
