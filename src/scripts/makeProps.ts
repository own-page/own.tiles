import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'react-docgen-typescript';
import { getPropsInfo } from 'utils/props';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const widgetsDir = path.join(__dirname, '..', 'widgets');
const outputDir = path.join(__dirname, '..', 'props');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const options = {
  shouldExtractValuesFromUnion: true,
  shouldExtractLiteralValuesFromEnum: true,
  savePropValueAsString: true
};

fs.readdirSync(widgetsDir).forEach((file: string) => {
  if (file.endsWith('.tsx')) {
    const filePath = path.join(widgetsDir, file);
    try {
      const parsedInfo = parse(filePath, options);
      const propsInfo = getPropsInfo(parsedInfo);

      const outputPath = path.join(
        outputDir,
        `${path.parse(file).name}.props.json`
      );
      fs.writeFileSync(outputPath, JSON.stringify(propsInfo, null, 2));
    } catch (error) {
      console.error(`Error processing ${file}:`, error);
    }
  }
});

console.log('Props info generation complete.');
