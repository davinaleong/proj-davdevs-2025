#!/usr/bin/env node

/**
 * MDX to Enhanced Markdown Migration Script
 * 
 * This script converts MDX files to enhanced markdown files with:
 * - Component detection and extraction
 * - Frontmatter enhancement
 * - Content cleaning
 * - Backup creation
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Configuration
const CONFIG = {
  contentDirs: [
    'app/content/articles',
    'app/content/projects', 
    'app/content/fem',
    'app/content/notebooks',
    'app/content/tools',
    'app/content/sermons',
    'app/content/static',
    'app/content/technical-demos',
    'app/content/knowledge-sharing'
  ],
  backupDir: 'migration-backup',
  dryRun: process.argv.includes('--dry-run'),
  verbose: process.argv.includes('--verbose'),
};

// Tool component mappings
const TOOL_MAPPINGS = {
  'Calculator': 'calculator',
  'CardMilesConverter': 'card-miles-converter',
  'ColorPalettes': 'color-palettes',
  'ColorValueConverter': 'color-value-converter',
  'DuplicatedParagraphScanner': 'duplicated-paragraph-scanner',
  'MemoryCards': 'memory-cards',
  'PasswordCreator': 'password-creator',
  'PasswordStrengthMeter': 'password-strength-meter',
  'QrCodeGenerator': 'qr-code-generator',
  'Translator': 'translator',
  'Timers': 'timers',
  'Minesweeper': 'minesweeper',
  'EmojiFoodCatcher': 'emoji-food-catcher',
};

/**
 * Logging utilities
 */
function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : level === 'success' ? '✅' : 'ℹ️';
  console.log(`[${timestamp}] ${prefix} ${message}`);
}

function verbose(message) {
  if (CONFIG.verbose) {
    log(message, 'verbose');
  }
}

/**
 * Create backup directory and backup file
 */
function createBackup(filePath) {
  if (CONFIG.dryRun) return;

  const backupPath = path.join(CONFIG.backupDir, path.relative(process.cwd(), filePath));
  const backupDir = path.dirname(backupPath);
  
  // Create backup directory if it doesn't exist
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  
  // Copy original file to backup
  fs.copyFileSync(filePath, backupPath);
  verbose(`Backed up: ${filePath} → ${backupPath}`);
}

/**
 * Detect React components in MDX content
 */
function detectComponents(content) {
  const components = new Set();
  const componentConfig = {};
  
  // Match JSX components: <ComponentName prop="value" />
  const jsxMatches = content.match(/<[A-Z][a-zA-Z0-9]*(?:\s+[^>]*)?\s*\/?>/g) || [];
  
  jsxMatches.forEach(match => {
    const componentMatch = match.match(/<([A-Z][a-zA-Z0-9]*)/);
    if (componentMatch) {
      const componentName = componentMatch[1];
      
      // Map to tool component name
      if (TOOL_MAPPINGS[componentName]) {
        components.add(TOOL_MAPPINGS[componentName]);
        
        // Extract props for component config
        const propMatches = match.match(/(\w+)=(?:{([^}]+)}|"([^"]*)")/g) || [];
        if (propMatches.length > 0) {
          const config = {};
          propMatches.forEach(prop => {
            const [, key, jsValue, stringValue] = prop.match(/(\w+)=(?:{([^}]+)}|"([^"]*)")/) || [];
            if (key) {
              try {
                config[key] = jsValue ? eval(jsValue) : stringValue;
              } catch (e) {
                config[key] = jsValue || stringValue;
              }
            }
          });
          componentConfig[TOOL_MAPPINGS[componentName]] = config;
        }
      } else {
        components.add(componentName.toLowerCase());
      }
    }
  });
  
  return {
    components: Array.from(components),
    componentConfig
  };
}

/**
 * Clean MDX content to markdown
 */
function cleanContent(content) {
  let cleaned = content;
  
  // Remove JSX components and replace with placeholders
  cleaned = cleaned.replace(/<[A-Z][a-zA-Z0-9]*(?:\s+[^>]*)?\s*\/?>/g, '<!-- Component will be rendered above -->');
  
  // Clean up multiple consecutive placeholders
  cleaned = cleaned.replace(/(<!-- Component will be rendered above -->\s*){2,}/g, '<!-- Component will be rendered above -->\n\n');
  
  // Remove import statements
  cleaned = cleaned.replace(/^import\s+.*$/gm, '');
  
  // Remove empty lines at the beginning
  cleaned = cleaned.replace(/^\s*\n/, '');
  
  return cleaned.trim();
}

/**
 * Process a single MDX file
 */
function processMDXFile(filePath) {
  try {
    verbose(`Processing: ${filePath}`);
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContent);
    
    // Detect components in content
    const { components, componentConfig } = detectComponents(content);
    
    // Clean content
    const cleanedContent = cleanContent(content);
    
    // Enhance frontmatter
    const enhancedFrontmatter = { ...frontmatter };
    
    if (components.length > 0) {
      enhancedFrontmatter.components = components;
      verbose(`  Found components: ${components.join(', ')}`);
    }
    
    if (Object.keys(componentConfig).length > 0) {
      enhancedFrontmatter.componentConfig = componentConfig;
      verbose(`  Found component config: ${JSON.stringify(componentConfig)}`);
    }
    
    // Detect if this is a tools post
    const isToolPost = filePath.includes('/tools/') || components.some(comp => 
      Object.values(TOOL_MAPPINGS).includes(comp)
    );
    
    if (isToolPost) {
      if (!enhancedFrontmatter.components) {
        enhancedFrontmatter.components = [];
      }
      if (!enhancedFrontmatter.components.includes('tool')) {
        enhancedFrontmatter.components.push('tool');
      }
    }
    
    // Generate new content
    const newContent = matter.stringify(cleanedContent, enhancedFrontmatter);
    
    // Determine output path (.mdx → .md)
    const outputPath = filePath.replace(/\.mdx$/, '.md');
    
    if (!CONFIG.dryRun) {
      // Create backup
      createBackup(filePath);
      
      // Write new file
      fs.writeFileSync(outputPath, newContent, 'utf8');
      
      // Remove old MDX file if different from new file
      if (outputPath !== filePath) {
        fs.unlinkSync(filePath);
      }
    }
    
    log(`Migrated: ${path.relative(process.cwd(), filePath)} → ${path.relative(process.cwd(), outputPath)}`, 'success');
    
    return {
      success: true,
      originalPath: filePath,
      outputPath,
      componentsFound: components.length,
      hasConfig: Object.keys(componentConfig).length > 0
    };
    
  } catch (error) {
    log(`Failed to process ${filePath}: ${error.message}`, 'error');
    return {
      success: false,
      originalPath: filePath,
      error: error.message
    };
  }
}

/**
 * Find all MDX files in content directories
 */
function findMDXFiles() {
  const mdxFiles = [];
  
  for (const contentDir of CONFIG.contentDirs) {
    const fullPath = path.join(process.cwd(), contentDir);
    
    if (!fs.existsSync(fullPath)) {
      verbose(`Skipping non-existent directory: ${contentDir}`);
      continue;
    }
    
    const files = fs.readdirSync(fullPath);
    for (const file of files) {
      if (file.endsWith('.mdx')) {
        mdxFiles.push(path.join(fullPath, file));
      }
    }
  }
  
  return mdxFiles;
}

/**
 * Generate migration report
 */
function generateReport(results) {
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const withComponents = results.filter(r => r.success && r.componentsFound > 0);
  const withConfig = results.filter(r => r.success && r.hasConfig);
  
  log('\n📊 Migration Report:');
  log(`  Total files processed: ${results.length}`);
  log(`  Successfully migrated: ${successful.length}`);
  log(`  Failed: ${failed.length}`);
  log(`  Files with components: ${withComponents.length}`);
  log(`  Files with component config: ${withConfig.length}`);
  
  if (failed.length > 0) {
    log('\n❌ Failed files:');
    failed.forEach(f => log(`  - ${f.originalPath}: ${f.error}`));
  }
  
  if (withComponents.length > 0) {
    log('\n🔧 Files with components (require attention):');
    withComponents.forEach(f => {
      log(`  - ${path.relative(process.cwd(), f.outputPath)} (${f.componentsFound} components)`);
    });
  }
  
  if (!CONFIG.dryRun && successful.length > 0) {
    log(`\n💾 Backups created in: ${CONFIG.backupDir}`);
    log('\n🚀 Next steps:');
    log('  1. Review migrated files');  
    log('  2. Update imports in your page components to use enhanced-content.ts');
    log('  3. Replace PostPage with EnhancedPostPage in your routes');
    log('  4. Test the migrated content');
    log('  5. Remove backup files once satisfied');
  }
}

/**
 * Main migration function
 */
async function migrate() {
  log('🚀 Starting MDX to Enhanced Markdown migration...');
  
  if (CONFIG.dryRun) {
    log('🔍 Running in DRY RUN mode - no files will be modified');
  }
  
  // Find all MDX files
  const mdxFiles = findMDXFiles();
  
  if (mdxFiles.length === 0) {
    log('No MDX files found to migrate', 'warn');
    return;
  }
  
  log(`Found ${mdxFiles.length} MDX files to process`);
  
  // Process each file
  const results = [];
  for (const file of mdxFiles) {
    const result = processMDXFile(file);
    results.push(result);
  }
  
  // Generate report
  generateReport(results);
  
  log('✨ Migration completed!');
}

// Handle CLI arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
MDX to Enhanced Markdown Migration Script

Usage: node migrate-mdx-to-md.js [options]

Options:
  --dry-run     Run without making any changes
  --verbose     Enable detailed logging  
  --help, -h    Show this help message

Examples:
  node migrate-mdx-to-md.js --dry-run    # Preview changes
  node migrate-mdx-to-md.js --verbose    # Run with detailed logs
  node migrate-mdx-to-md.js              # Run migration
`);
  process.exit(0);
}

// Run migration
migrate().catch(error => {
  log(`Migration failed: ${error.message}`, 'error');
  process.exit(1);
});