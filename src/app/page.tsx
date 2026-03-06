import React from 'react';
import Link from 'next/link';

const Page: React.FC = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <section className="text-center py-10">
        <h1 className="text-4xl font-bold text-gray-800">Master Your MCP Servers with Ease</h1>
        <p className="mt-4 text-lg text-gray-600">
          Simplify MCP server management and debugging for developers.
        </p>
      </section>

      <section className="py-10">
        <h2 className="text-2xl font-semibold text-gray-800">MVP Features</h2>
        <ul className="list-disc list-inside mt-4 text-lg text-gray-600">
          <li>Real-time monitoring dashboard for MCP server interactions</li>
          <li>Automated integration testing suite with customizable scenarios</li>
          <li>Interactive debugging tools to trace and resolve issues easily</li>
          <li>Audit log management for tracking server function calls</li>
          <li>User-friendly API documentation generation</li>
        </ul>
      </section>

      <section className="py-10">
        <Link href="/signup">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition">
            Get Started
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Page;