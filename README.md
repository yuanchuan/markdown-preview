# markdown-preview 
Markdown preview made easy (with live update).

### Installation

```bash
  npm install -g markdown-preview 
```

### Usage
First, start the server with a given filename to preview.

```bash
  markdown-preview <filename> [options]
```

Next, see the preview by navigating in your browser to `http://localhost:<port>/<filename>`.

### Options

  `-h`, `--help`                   output usage information   
  `-V`, `--version`                output the version number   
  `-p`, `--port <port>`            server port (defaults to 3333)  
  `-c`, `--css <name>`             use customize css file for styling  
  `-m`, `--marked`                 use marked to parse markdown  
  `-i`, `--highlight <highlight>`  set highlight style  


#### Code highlight style list
  [https://github.com/isagalaev/highlight.js/tree/master/src/styles](https://github.com/isagalaev/highlight.js/tree/master/src/styles)
