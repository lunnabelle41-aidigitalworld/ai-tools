const { exec } = require('child_process');

// Run prisma generate
exec('npx prisma generate', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error generating Prisma client: ${error}`);
    return;
  }
  console.log(`Prisma generate output: ${stdout}`);
  
  // Run next build
  exec('npx next build', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error building Next.js app: ${error}`);
      return;
    }
    console.log(`Next.js build output: ${stdout}`);
  });
});