import fastify from 'fastify';

const server = fastify({ logger: true });

try {
    await server.listen({ port: 3000 });
} catch (error) {
    console.error('An error ', error);
    process.exit(1);
}
