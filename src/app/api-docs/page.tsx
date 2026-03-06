import React from 'react';
import Link from 'next/link';

const API_DOCS = [
  {
    method: 'GET',
    endpoint: '/api/v1/servers',
    description: 'Retrieve a list of MCP servers.',
  },
  {
    method: 'POST',
    endpoint: '/api/v1/servers',
    description: 'Create a new MCP server.',
  },
  {
    method: 'GET',
    endpoint: '/api/v1/servers/:id',
    description: 'Retrieve detailed information about a specific MCP server.',
  },
  {
    method: 'PUT',
    endpoint: '/api/v1/servers/:id',
    description: 'Update an existing MCP server.',
  },
  {
    method: 'DELETE',
    endpoint: '/api/v1/servers/:id',
    description: 'Delete a specific MCP server.',
  },
  {
    method: 'POST',
    endpoint: '/api/v1/integration-tests',
    description: 'Run automated integration tests on MCP servers.',
  },
  {
    method: 'GET',
    endpoint: '/api/v1/debug',
    description: 'Get debug tools for tracing MCP server issues.',
  },
  {
    method: 'GET',
    endpoint: '/api/v1/audit-logs',
    description: 'Retrieve server function call logs.',
  },
  {
    method: 'GET',
    endpoint: '/api/v1/docs',
    description: 'Generate API documentation.',
  },
];

const ApiDocsPage: React.FC = () => {
  return (
    <div className="container">
      <h1>API Documentation</h1>
      <p>Master Your MCP Servers with Ease</p>
      <h2>MVP Features</h2>
      <ul>
        <li>Real-time monitoring dashboard for MCP server interactions</li>
        <li>Automated integration testing suite with customizable scenarios</li>
        <li>Interactive debugging tools to trace and resolve issues easily</li>
        <li>Audit log management for tracking server function calls</li>
        <li>User-friendly API documentation generation</li>
      </ul>
      <h2>API Endpoints</h2>
      <table>
        <thead>
          <tr>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {API_DOCS.map((api) => (
            <tr key={api.endpoint}>
              <td>{api.method}</td>
              <td>
                <Link href={api.endpoint}>{api.endpoint}</Link>
              </td>
              <td>{api.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .container {
          padding: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
        }
      `}</style>
    </div>
  );
};

export default ApiDocsPage;