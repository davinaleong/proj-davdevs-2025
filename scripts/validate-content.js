#!/usr/bin/env node

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
  
  const files = fs.readdirSync(fullPath).filter(f => f.match(/\.(md|mdx)$/));
  
  files.forEach(file => {
    totalFiles++;
    const filePath = path.join(fullPath, file);
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(content);
      
      // Validate required fields
      const required = ['title', 'slug', 'description', 'date', 'author', 'tags', 'published'];
      const missing = required.filter(field => !(field in data));
      
      if (missing.length > 0) {
        issues.push({
          file: path.relative(process.cwd(), filePath),
          issue: `Missing required fields: ${missing.join(', ')}`
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
            issue: `Unknown components: ${invalid.join(', ')}`
          });
        }
      }
      
    } catch (error) {
      issues.push({
        file: path.relative(process.cwd(), filePath),
        issue: `Parse error: ${error.message}`
      });
    }
  });
});

console.log(`📊 Validation Results:`);
console.log(`  Total files: ${totalFiles}`);
console.log(`  Valid files: ${validFiles}`);
console.log(`  Issues found: ${issues.length}\\n`);

if (issues.length > 0) {
  console.log('❌ Issues found:');
  issues.forEach(issue => {
    console.log(`  ${issue.file}: ${issue.issue}`);
  });
  process.exit(1);
} else {
  console.log('✅ All files are valid!');
}
