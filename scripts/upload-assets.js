import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

// 1. Carregar variáveis do arquivo .env manualmente para evitar dependências adicionais
const envPath = path.resolve('.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      // Remover aspas simples/duplas se houver
      if (value.length > 0 && value.charAt(0) === '"' && value.charAt(value.length - 1) === '"') {
        value = value.substring(1, value.length - 1);
      }
      process.env[key] = value;
    }
  });
}

const token = process.env.BLOB_READ_WRITE_TOKEN;
if (!token) {
  console.error('ERRO: BLOB_READ_WRITE_TOKEN não foi encontrado no arquivo .env!');
  process.exit(1);
}

// Configurar o token globalmente para o SDK do Vercel Blob
process.env.BLOB_READ_WRITE_TOKEN = token;

const PUBLIC_DIR = path.resolve('public');
const SRC_DIR = path.resolve('src');

// Extensões de arquivos permitidos para upload
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.mp4'];

// Coletar arquivos recursivamente
function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else {
      const ext = path.extname(name).toLowerCase();
      if (ALLOWED_EXTENSIONS.includes(ext)) {
        fileList.push(name);
      }
    }
  }
  return fileList;
}

async function run() {
  console.log('Buscando imagens locais na pasta public...');
  const filesToUpload = getFiles(PUBLIC_DIR);
  console.log(`Encontrados ${filesToUpload.length} arquivos para upload.`);

  const mapping = {};

  for (const filePath of filesToUpload) {
    // Obter o caminho relativo ao public (ex: /colecao_estampas/Summer-Mocha-&-Blue/estampa1.jpeg)
    const relativePath = '/' + path.relative(PUBLIC_DIR, filePath).replace(/\\/g, '/');
    const filename = path.basename(filePath);

    console.log(`Enviando ${relativePath}...`);
    try {
      const fileBuffer = fs.readFileSync(filePath);
      
      // Fazer upload para o Vercel Blob
      const blob = await put(relativePath.substring(1), fileBuffer, {
        access: 'public',
        contentType: getContentType(filePath)
      });

      mapping[relativePath] = blob.url;
      console.log(`Sucesso: ${relativePath} -> ${blob.url}`);
    } catch (error) {
      console.error(`Erro ao subir ${relativePath}:`, error.message);
    }
  }

  // Salvar backup do mapeamento
  fs.writeFileSync('blob-mapping.json', JSON.stringify(mapping, null, 2));
  console.log('Mapeamento salvo em blob-mapping.json');

  // Substituir os caminhos nos arquivos da pasta src/
  console.log('Substituindo caminhos locais pelos links do Vercel Blob na pasta src...');
  replaceInDir(SRC_DIR, mapping);

  console.log('Concluído! Todos os assets locais foram enviados e mapeados no código.');
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.svg') return 'image/svg+xml';
  if (ext === '.mp4') return 'video/mp4';
  return 'application/octet-stream';
}

function replaceInDir(dir, mapping) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath, mapping);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (['.js', '.jsx', '.css', '.html'].includes(ext)) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        for (const [localPath, remoteUrl] of Object.entries(mapping)) {
          // Substituir aspas simples e duplas com o caminho relativo
          const singleQuoteRegex = new RegExp(`'${localPath}'`, 'g');
          const doubleQuoteRegex = new RegExp(`"${localPath}"`, 'g');
          const urlCssRegex = new RegExp(`url\\(${localPath}\\)`, 'g');
          const urlCssQuotesRegex = new RegExp(`url\\(["']${localPath}["']\\)`, 'g');

          if (singleQuoteRegex.test(content)) {
            content = content.replace(singleQuoteRegex, `'${remoteUrl}'`);
            modified = true;
          }
          if (doubleQuoteRegex.test(content)) {
            content = content.replace(doubleQuoteRegex, `"${remoteUrl}"`);
            modified = true;
          }
          if (urlCssRegex.test(content)) {
            content = content.replace(urlCssRegex, `url(${remoteUrl})`);
            modified = true;
          }
          if (urlCssQuotesRegex.test(content)) {
            content = content.replace(urlCssQuotesRegex, `url(${remoteUrl})`);
            modified = true;
          }
        }

        if (modified) {
          fs.writeFileSync(fullPath, content, 'utf8');
          console.log(`Atualizado: ${path.relative(SRC_DIR, fullPath)}`);
        }
      }
    }
  }
}

run();
