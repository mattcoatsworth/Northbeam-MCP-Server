import axios from 'axios';

    class NorthbeamClient {
      constructor() {
        this.apiKey = process.env.NORTHBEAM_API_KEY;
        this.brand = process.env.NORTHBEAM_BRAND;
        this.baseUrl = 'https://api.northbeam.io/v1';
        this.client = axios.create({
          baseURL: this.baseUrl,
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': this.apiKey
          }
        });
      }

      async getMetric(metricName, startDate, endDate, dimensions = []) {
        try {
          const params = {
            brand: this.brand,
            metrics: [metricName],
            ...(startDate && { start_date: startDate }),
            ...(endDate && { end_date: endDate }),
            ...(dimensions.length > 0 && { dimensions })
          };

          const response = await this.client.post('/query', params);
          return response.data;
        } catch (error) {
          this._handleError(error);
        }
      }

      async listMetrics() {
        try {
          const response = await this.client.get(`/brands/${this.brand}/metrics`);
          return response.data;
        } catch (error) {
          this._handleError(error);
        }
      }

      async listDimensions() {
        try {
          const response = await this.client.get(`/brands/${this.brand}/dimensions`);
          return response.data;
        } catch (error) {
          this._handleError(error);
        }
      }

      async getChannelPerformance(startDate, endDate, metrics) {
        try {
          const params = {
            brand: this.brand,
            start_date: startDate,
            end_date: endDate,
            metrics: metrics,
            dimensions: ['channel']
          };

          const response = await this.client.post('/query', params);
          return response.data;
        } catch (error) {
          this._handleError(error);
        }
      }

      async getCohortAnalysis(cohortType, startDate, endDate, metrics) {
        try {
          const params = {
            brand: this.brand,
            start_date: startDate,
            end_date: endDate,
            metrics: metrics,
            cohort_type: cohortType
          };

          const response = await this.client.post('/cohorts', params);
          return response.data;
        } catch (error) {
          this._handleError(error);
        }
      }

      async getAttribution(model, startDate, endDate, metrics) {
        try {
          const params = {
            brand: this.brand,
            start_date: startDate,
            end_date: endDate,
            metrics: metrics,
            attribution_model: model
          };

          const response = await this.client.post('/attribution', params);
          return response.data;
        } catch (error) {
          this._handleError(error);
        }
      }

      _handleError(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          const errorMessage = error.response.data.message || JSON.stringify(error.response.data);
          throw new Error(`API Error (${error.response.status}): ${errorMessage}`);
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error('No response received from Northbeam API');
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(`Request Error: ${error.message}`);
        }
      }
    }

    export const northbeamClient = new NorthbeamClient();
