#!/usr/bin/env node

/**
 * Enhanced Markdown Setup Script
 * 
 * This script sets up the enhanced markdown system alongside your existing MDX setup
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Enhanced Markdown system...\n');

// Step 1: Install marked dependency
console.log('📦 Installing marked dependency...');
try {
  execSync('npm install marked', { stdio: 'inherit' });
  console.log('✅ marked installed successfully\n');
} catch (error) {
  console.error('❌ Failed to install marked:', error.message);
  process.exit(1);
}

// Step 2: Update package.json scripts
console.log('🔧 Adding migration scripts to package.json...');
try {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Add new scripts
  packageJson.scripts = {
    ...packageJson.scripts,
    'migrate:preview': 'node scripts/migrate-mdx-to-md.js --dry-run --verbose',
    'migrate:run': 'node scripts/migrate-mdx-to-md.js --verbose',
    'content:validate': 'node scripts/validate-content.js'
  };
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log('✅ Scripts added to package.json\n');
} catch (error) {
  console.error('❌ Failed to update package.json:', error.message);
}

// Step 3: Create examples directory if it doesn't exist
console.log('📁 Creating examples directory...');
const examplesDir = path.join(process.cwd(), 'examples');
if (!fs.existsSync(examplesDir)) {
  fs.mkdirSync(examplesDir);
  console.log('✅ Examples directory created\n');
} else {
  console.log('ℹ️ Examples directory already exists\n');
}

// Step 4: Create validation script
console.log('📝 Creating content validation script...');
const validationScript = `#!/usr/bin/env node

/**
 * Content Validation Script
 * Validates both MDX and enhanced markdown files
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDirs = [
  'app/content/articles', 'app/content/projects', 'app/content/fem',
  'app/content/notebooks', 'app/content/tools', 'app/content/sermons',
  'app/content/static', 'app/content/technical-demos', 'app/content/knowledge-sharing'
];

let totalFiles = 0;
let validFiles = 0;
let issues = [];

console.log('🔍 Validating content files...\\n');

contentDirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) return;
  
  const files = fs.readdirSync(fullPath).filter(f => f.match(/\\.(md|mdx)$/));
  
  files.forEach(file => {
    totalFiles++;
    const filePath = path.join(fullPath, file);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      
      // Validate required fields
      const required = ['title', 'slug', 'description', 'date', 'author', 'tags', 'published'];
      const missing = required.filter(field => !data[field]);
      
      if (missing.length > 0) {
        issues.push({
          file: path.relative(process.cwd(), filePath),
          issue: \`Missing required fields: \${missing.join(', ')}\`
        });
      } else {
        validFiles++;
      }
      
      // Check for enhanced markdown specific issues
      if (file.endsWith('.md') && data.components) {
        const validComponents = ['tool', 'calculator', 'qr-code-generator']; // Add more as needed
        const invalid = data.components.filter(comp => !validComponents.includes(comp));
        if (invalid.length > 0) {
          issues.push({
            file: path.relative(process.cwd(), filePath),
            issue: \`Unknown components: \${invalid.join(', ')}\`
          });
        }
      }
      
    } catch (error) {
      issues.push({
        file: path.relative(process.cwd(), filePath),
        issue: \`Parse error: \${error.message}\`
      });
    }
  });
});

console.log(\`📊 Validation Results:\`);
console.log(\`  Total files: \${totalFiles}\`);
console.log(\`  Valid files: \${validFiles}\`);
console.log(\`  Issues found: \${issues.length}\\n\`);

if (issues.length > 0) {
  console.log('❌ Issues found:');
  issues.forEach(issue => {
    console.log(\`  \${issue.file}: \${issue.issue}\`);
  });
  process.exit(1);
} else {
  console.log('✅ All files are valid!');
}
`;

fs.writeFileSync(path.join(process.cwd(), 'scripts', 'validate-content.js'), validationScript);
console.log('✅ Content validation script created\n');

// Step 5: Update TypeScript types if needed
console.log('📝 Checking TypeScript configuration...');
const grayMatterTypesPath = path.join(process.cwd(), 'types', 'gray-matter.d.ts');
if (fs.existsSync(grayMatterTypesPath)) {
  console.log('ℹ️ gray-matter types already exist\n');
} else {
  console.log('ℹ️ gray-matter types not found, but enhanced-content.ts includes its own types\n');
}

// Final instructions
console.log('🎉 Setup complete! Next steps:');
console.log('');
console.log('1. Preview your migration:');
console.log('   npm run migrate:preview');
console.log('');
console.log('2. Run the migration:');
console.log('   npm run migrate:run');
console.log('');
console.log('3. Update your page components to use enhanced-content.ts:');
console.log('   import { getEnhancedPostBySlug } from "../utils/enhanced-content"');
console.log('   import EnhancedPostPage from "../components/EnhancedPostPage"');
console.log('');
console.log('4. Validate your content:');
console.log('   npm run content:validate');
console.log('');
console.log('5. Test the new system thoroughly before removing MDX dependencies');
console.log('');
console.log('📚 Documentation: Check migration-plan.md for detailed instructions');
`;

fs.writeFileSync(path.join(process.cwd(), 'scripts', 'setup-enhanced-markdown.js'), 
  fs.readFileSync(__filename, 'utf8'));

console.log('💾 Setup script saved for future reference\n');