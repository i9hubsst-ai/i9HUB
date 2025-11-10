/**
 * Script para gerar favicons a partir do logo do i9HUBSST
 * 
 * Este script usa sharp para redimensionar o logo em vários tamanhos
 * e criar os favicons necessários.
 * 
 * Instale primeiro: npm install sharp
 * Execute: node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'favicon-96x96.png', size: 96 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'web-app-manifest-192x192.png', size: 192 },
  { name: 'web-app-manifest-512x512.png', size: 512 },
];

const sourceLogo = path.join(__dirname, '../public/images/hubsst-logo-new.png');
const outputDir = path.join(__dirname, '../public');

async function generateFavicons() {
  console.log('🎨 Gerando favicons a partir do logo i9HUBSST...\n');

  try {
    // Verificar se o logo existe
    if (!fs.existsSync(sourceLogo)) {
      console.error('❌ Logo não encontrado:', sourceLogo);
      process.exit(1);
    }

    // Gerar cada tamanho
    for (const { name, size } of sizes) {
      const outputPath = path.join(outputDir, name);
      
      await sharp(sourceLogo)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Gerado: ${name} (${size}x${size})`);
    }

    // Gerar favicon.ico (contém múltiplos tamanhos)
    // Para .ico, vamos usar o 32x32 como base
    const icoPath = path.join(outputDir, 'favicon.ico');
    await sharp(sourceLogo)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 }
      })
      .png()
      .toFile(icoPath.replace('.ico', '-temp.png'));
    
    // Renomear para .ico (browsers aceitam PNG com extensão .ico)
    fs.renameSync(
      icoPath.replace('.ico', '-temp.png'),
      icoPath
    );
    console.log(`✅ Gerado: favicon.ico (32x32)`);

    // Gerar favicon.svg (vetorial, melhor qualidade)
    // Como o logo é PNG, vamos copiar uma versão otimizada
    const svgPath = path.join(outputDir, 'favicon.svg');
    console.log('\n⚠️  ATENÇÃO: favicon.svg precisa ser criado manualmente como SVG');
    console.log('   Por enquanto, usando PNG de alta qualidade\n');

    console.log('\n✨ Todos os favicons foram gerados com sucesso!');
    console.log('\n📝 Próximos passos:');
    console.log('   1. Verifique os arquivos gerados em /public');
    console.log('   2. Faça commit das alterações');
    console.log('   3. Faça deploy para produção');
    console.log('   4. Limpe o cache do navegador (Ctrl+Shift+Delete)');
    console.log('   5. Teste em: https://i9hubsst.vercel.app/debug/favicon');

  } catch (error) {
    console.error('❌ Erro ao gerar favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
