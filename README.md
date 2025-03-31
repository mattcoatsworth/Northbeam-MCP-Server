# Northbeam MCP Server

    This is a Model Context Protocol (MCP) server for accessing Northbeam marketing analytics data. It provides tools and resources for querying metrics, dimensions, channel performance, cohort analysis, and attribution data from Northbeam.

    ## Setup

    1. Install dependencies:
       ```
       npm install
       ```

    2. Create a `.env` file with your Northbeam API key and brand name:
       ```
       NORTHBEAM_API_KEY=your_api_key_here
       NORTHBEAM_BRAND=your_brand_name_here
       ```

    3. Run the server:
       ```
       npm run dev
       ```

    ## Testing with MCP Inspector

    You can test the server using the MCP Inspector:

    ```
    npm run inspect
    ```

    This will open a web interface where you can test all the available tools and resources.

    ## Available Tools

    - `get_metric`: Get metric data from Northbeam
    - `list_metrics`: List all available metrics in Northbeam
    - `list_dimensions`: List all available dimensions in Northbeam
    - `get_channel_performance`: Get channel performance data from Northbeam
    - `get_cohort_analysis`: Get cohort analysis data from Northbeam
    - `get_attribution`: Get attribution data from Northbeam

    ## Available Resources

    - `northbeam://metrics/{metric_name}`: Get data for a specific metric

    ## Usage as a Package

    You can also use this as an npm package:

    ```
    npx northbeam-mcp
    ```

    Or with the inspector:

    ```
    npx @modelcontextprotocol/inspector npx northbeam-mcp
    ```
