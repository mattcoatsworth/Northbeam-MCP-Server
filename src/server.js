import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
    import { z } from 'zod';
    import { northbeamClient } from './northbeam-client.js';

    // Create an MCP server for Northbeam
    const server = new McpServer({
      name: "Northbeam API",
      version: "1.0.0",
      description: "MCP server for accessing Northbeam marketing analytics data"
    });

    // Add a resource to get metrics data
    server.resource(
      "metrics",
      new ResourceTemplate("northbeam://metrics/{metric_name}", { list: undefined }),
      async (uri, { metric_name }) => {
        try {
          const data = await northbeamClient.getMetric(metric_name);
          return {
            contents: [{
              uri: uri.href,
              text: JSON.stringify(data, null, 2)
            }]
          };
        } catch (error) {
          return {
            contents: [{
              uri: uri.href,
              text: `Error fetching metric ${metric_name}: ${error.message}`
            }]
          };
        }
      }
    );

    // Add a tool to get metrics data
    server.tool(
      "get_metric",
      {
        metric_name: z.string().describe("Name of the metric to retrieve"),
        start_date: z.string().optional().describe("Start date in YYYY-MM-DD format"),
        end_date: z.string().optional().describe("End date in YYYY-MM-DD format"),
        dimensions: z.array(z.string()).optional().describe("Dimensions to group by")
      },
      async ({ metric_name, start_date, end_date, dimensions }) => {
        try {
          const data = await northbeamClient.getMetric(metric_name, start_date, end_date, dimensions);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(data, null, 2) 
            }]
          };
        } catch (error) {
          return {
            content: [{ 
              type: "text", 
              text: `Error fetching metric ${metric_name}: ${error.message}` 
            }],
            isError: true
          };
        }
      },
      { description: "Get metric data from Northbeam" }
    );

    // Add a tool to get available metrics
    server.tool(
      "list_metrics",
      {},
      async () => {
        try {
          const metrics = await northbeamClient.listMetrics();
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(metrics, null, 2) 
            }]
          };
        } catch (error) {
          return {
            content: [{ 
              type: "text", 
              text: `Error listing metrics: ${error.message}` 
            }],
            isError: true
          };
        }
      },
      { description: "List all available metrics in Northbeam" }
    );

    // Add a tool to get dimensions
    server.tool(
      "list_dimensions",
      {},
      async () => {
        try {
          const dimensions = await northbeamClient.listDimensions();
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(dimensions, null, 2) 
            }]
          };
        } catch (error) {
          return {
            content: [{ 
              type: "text", 
              text: `Error listing dimensions: ${error.message}` 
            }],
            isError: true
          };
        }
      },
      { description: "List all available dimensions in Northbeam" }
    );

    // Add a tool to get channel performance
    server.tool(
      "get_channel_performance",
      {
        start_date: z.string().describe("Start date in YYYY-MM-DD format"),
        end_date: z.string().describe("End date in YYYY-MM-DD format"),
        metrics: z.array(z.string()).describe("Metrics to include in the report")
      },
      async ({ start_date, end_date, metrics }) => {
        try {
          const data = await northbeamClient.getChannelPerformance(start_date, end_date, metrics);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(data, null, 2) 
            }]
          };
        } catch (error) {
          return {
            content: [{ 
              type: "text", 
              text: `Error fetching channel performance: ${error.message}` 
            }],
            isError: true
          };
        }
      },
      { description: "Get channel performance data from Northbeam" }
    );

    // Add a tool to get cohort analysis
    server.tool(
      "get_cohort_analysis",
      {
        cohort_type: z.enum(["first_touch", "last_touch"]).describe("Type of cohort analysis"),
        start_date: z.string().describe("Start date in YYYY-MM-DD format"),
        end_date: z.string().describe("End date in YYYY-MM-DD format"),
        metrics: z.array(z.string()).describe("Metrics to include in the analysis")
      },
      async ({ cohort_type, start_date, end_date, metrics }) => {
        try {
          const data = await northbeamClient.getCohortAnalysis(cohort_type, start_date, end_date, metrics);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(data, null, 2) 
            }]
          };
        } catch (error) {
          return {
            content: [{ 
              type: "text", 
              text: `Error fetching cohort analysis: ${error.message}` 
            }],
            isError: true
          };
        }
      },
      { description: "Get cohort analysis data from Northbeam" }
    );

    // Add a tool to get attribution data
    server.tool(
      "get_attribution",
      {
        model: z.enum(["first_touch", "last_touch", "linear", "position_based", "time_decay"]).describe("Attribution model to use"),
        start_date: z.string().describe("Start date in YYYY-MM-DD format"),
        end_date: z.string().describe("End date in YYYY-MM-DD format"),
        metrics: z.array(z.string()).describe("Metrics to include in the attribution")
      },
      async ({ model, start_date, end_date, metrics }) => {
        try {
          const data = await northbeamClient.getAttribution(model, start_date, end_date, metrics);
          return {
            content: [{ 
              type: "text", 
              text: JSON.stringify(data, null, 2) 
            }]
          };
        } catch (error) {
          return {
            content: [{ 
              type: "text", 
              text: `Error fetching attribution data: ${error.message}` 
            }],
            isError: true
          };
        }
      },
      { description: "Get attribution data from Northbeam" }
    );

    export { server };
