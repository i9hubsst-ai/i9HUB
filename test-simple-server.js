const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`🟢 [${new Date().toISOString()}] SUCESSO - Recebido: ${req.method} ${req.url}`);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <h1>🎉 FUNCIONOU! Servidor HTTP Simples Funcionando!</h1>
    <p>Porta: 3001</p>
    <p>Hora: ${new Date().toISOString()}</p>
    <p>Método: ${req.method}</p>
    <p>URL: ${req.url}</p>
  `);
});

// Eventos detalhados do servidor
server.on('listening', () => {
  console.log('🎯 Evento: listening - Servidor começou a escutar');
  console.log('📍 Address:', server.address());
});

server.on('connection', (socket) => {
  console.log('🔗 Evento: connection - Nova conexão recebida');
  console.log('📡 Socket info:', {
    remoteAddress: socket.remoteAddress,
    remotePort: socket.remotePort,
    localAddress: socket.localAddress,
    localPort: socket.localPort
  });
});

server.on('request', (req, res) => {
  console.log('📨 Evento: request - Nova requisição');
});

server.on('error', (err) => {
  console.error('❌ Evento: error - Erro no servidor:', err);
  console.error('🔍 Código do erro:', err.code);
  console.error('🔍 Mensagem:', err.message);
});

server.on('clientError', (err, socket) => {
  console.error('⚠️ Evento: clientError - Erro do cliente:', err);
});

console.log('🚀 Iniciando servidor...');
server.listen(8080, '127.0.0.1', () => {
  console.log('✅ Servidor HTTP simples rodando na porta 8080:');
  console.log('   - http://localhost:8080');
  console.log('   - http://127.0.0.1:8080');
  console.log('🔍 Aguardando conexões...');
});