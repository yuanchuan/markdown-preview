# markdown-preview
Markdown preview made easy (with live update).

### Installation

```bash
  npm install -g markdown-preview
```

### Usage

```bash
  markdown-preview [options] <filename>
```

### Options

    -h, --help                   output usage information
    -V, --version                output the version number
    -P, --parser <parser>        use markdown parser, remark | marked | showdown
    -p, --port <port>            server port (defaults to 3333)
    -b, --browser <browser>      browser name to open
    -c, --css <name>             use customize css file for styling
    -w, --width <width>          limit the width of the document (defaults to 800px)
    -i, --highlight <highlight>  set highlight style
    -t, --timeout <seconds>      exit preview if idle (defaults to 3s)
    -o, --output <filename>      write to file

#### Code highlight style list
  [https://github.com/isagalaev/highlight.js/tree/master/src/styles](https://github.com/isagalaev/highlight.js/tree/master/src/styles)
