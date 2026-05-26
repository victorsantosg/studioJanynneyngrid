const fs = require('fs');
const path = require('path');

const screens = [
  {
    name: 'Home',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2NhNTU3NDk3NGYxYzQzMzM4ZWQ1Y2VjZGIyNjYyNjVmEgsSBxDg8qWPpw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzY0MTg5ODcxMTA3NTE4MDc3Nw&filename=&opi=89354086'
  },
  {
    name: 'Portfolio',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzczOGRjYTA1M2IwZjQ5OGFhYTIzMDVkNjIzM2M0ZDA4EgsSBxDg8qWPpw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzY0MTg5ODcxMTA3NTE4MDc3Nw&filename=&opi=89354086'
  },
  {
    name: 'Servicos',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzcwMjYyYzRlMjBmNzRlN2VhOWI5NmYxNjZkZWQxZTMyEgsSBxDg8qWPpw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzY0MTg5ODcxMTA3NTE4MDc3Nw&filename=&opi=89354086'
  },
  {
    name: 'Contato',
    url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2VjNmU1NDM1MDVjZTQzNDU4OWZlMDgyNDUxNmUyZmYyEgsSBxDg8qWPpw8YAZIBJAoKcHJvamVjdF9pZBIWQhQxNzY0MTg5ODcxMTA3NTE4MDc3Nw&filename=&opi=89354086'
  }
];

async function run() {
  const pagesDir = path.join(__dirname, 'src', 'pages');
  if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
  }

  for (const screen of screens) {
    console.log(`Fetching ${screen.name}...`);
    try {
      const res = await fetch(screen.url);
      let html = await res.text();
      
      // Basic HTML to JSX conversion
      html = html.replace(/class=/g, 'className=');
      html = html.replace(/for=/g, 'htmlFor=');
      html = html.replace(/<!--[\s\S]*?-->/g, ''); // remove comments
      
      // Self-close void elements (simplified)
      html = html.replace(/<(img|input|br|hr|meta|link)([^>]*?)(?<!\/)>/gi, '<$1$2 />');
      
      // Some style fixes (very basic)
      html = html.replace(/style="([^"]*)"/g, (match, p1) => {
        const rules = p1.split(';').filter(r => r.trim());
        const styleObj = {};
        rules.forEach(rule => {
          const [key, value] = rule.split(':');
          if (key && value) {
            const camelKey = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            styleObj[camelKey] = value.trim();
          }
        });
        return `style={${JSON.stringify(styleObj)}}`;
      });
      
      const jsx = `import React from 'react';\n\nexport default function ${screen.name}() {\n  return (\n    <>\n      ${html}\n    </>\n  );\n}\n`;
      
      fs.writeFileSync(path.join(pagesDir, `${screen.name}.jsx`), jsx);
      console.log(`Saved ${screen.name}.jsx`);
    } catch (e) {
      console.error(`Failed to process ${screen.name}:`, e);
    }
  }
}

run();
