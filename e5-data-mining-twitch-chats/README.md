# data-mining-via-twitch-chat

Data mining via twitch chat - created on stream

## Usage

`npm run start`
Result: `all-chatlogs.txt` contains all links in the listed video id. The file lands in the directory you run the command from.

## Todos

- [x] get the twitch chat log of a list of videos
- [x] get all links
  - [x] filter out all log lines that are not chat messages
  - [x] parse each line into username, date, message
  - [x] grab all links from messages
- [x] write links to a file
- [x] cleanup temp files

## References

- <https://github.com/bitjson/typescript-starter>
- <https://twitch.tv/videos/978749245>
- <https://npmjs.com/package/shelljs>
- <https://twitch.tv/fadeoutsama/v/978908587>
- <https://nodejs.org/api/readline.html#readline_example_read_file_stream_line_by_line>
- <https://nodesource.com/blog/understanding-streams-in-nodejs>
- <https://rxjs-dev.firebaseapp.com/guide/observable>
- <https://regex101.com>
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift>
- <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift>
- <http://twitch.com>
