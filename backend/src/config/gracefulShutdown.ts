import { Server } from 'http';
import { logger } from './logger';

export function setupGracefulShutdown(server: Server) {
  process.on('SIGTERM', () => {
    logger.info('SIGTERM signal received, closing HTTP server');
    server.close(() => {
      // Close all active connections (e.g., database connections,
      // file descriptors, etc.)
      logger.info('HTTP server closed');
      process.exit(0);
    });
  });
}
