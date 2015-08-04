# markdown-preview 
Markdown preview made easy (with live update).

### Installation

```bash
  npm install -g markdown-preview 
```

### Usage
```bash
  markdown-preview <filename> [options]
```

Or add an alias for it in your `.bash_profile`:
```bash
  alias mp='markdown-preview'
```

### Options

  `-h`, `--help`         output usage information  
  `-V`, `--version`      output the version number  
  `-p`, `--port <port>`  server port (defaults to 3333)  
  `-c`, `--css <name>`   use customize css file for styling  
  `-m`, `--marked`       use marked to parse markdown (defaults to showdown)
  `-h`, `--highlight <highlight>`  set highlight style (defaults to 'github')

#### Code highlight style list
  [https://github.com/isagalaev/highlight.js/tree/master/src/styles](https://github.com/isagalaev/highlight.js/tree/master/src/styles)
