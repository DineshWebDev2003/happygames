// Custom Netlify build plugin for Next.js standalone output
module.exports = {
  onBuild: async ({ utils }) => {
    console.log('Preparing Next.js standalone output for Netlify...');
    
    // Run shell commands to prepare the output
    try {
      // Copy public folder to standalone output
      await utils.run.command('cp -r public .next/standalone/public');
      
      // Copy Next.js static files to the right location
      await utils.run.command('cp -r .next/static .next/standalone/.next/static');
      
      console.log('✅ Successfully prepared Next.js standalone output for Netlify');
    } catch (error) {
      // Report a user error
      utils.build.failBuild('Error preparing standalone output: ' + error.message);
    }
  }
}; 