#!/usr/bin/env node
    import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
    import { server } from './server.js';
    import dotenv from 'dotenv';

    // Load environment variables
    dotenv.config();

    console.log('Starting Northbeam MCP server...');

    // Check for required environment variables
    if (!process.env.NORTHBEAM_API_KEY) {
      console.error('Error: NORTHBEAM_API_KEY environment variable is required');
      console.error('Please create a .env file with your Northbeam API key');
      process.exit(1);
    }

    if (!process.env.NORTHBEAM_BRAND) {
      console.error('Error: NORTHBEAM_BRAND environment variable is required');
      console.error('Please create a .env file with your Northbeam brand name');
      process.exit(1);
    }

    // Start receiving messages on stdin and sending messages on stdout
    const transport = new StdioServerTransport();
    await server.connect(transport);
