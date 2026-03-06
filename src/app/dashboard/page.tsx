import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../lib/firebaseConfig';
import { DashboardHeader } from '../../components/DashboardHeader';
import { ServerMonitoring } from '../../components/ServerMonitoring';
import { IntegrationTesting } from '../../components/IntegrationTesting';
import { DebuggingTools } from '../../components/DebuggingTools';
import { AuditLog } from '../../components/AuditLog';
import { ApiDocumentation } from '../../components/ApiDocumentation';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Dashboard = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <div>
      <DashboardHeader user={user} />
      <main>
        <h1>Master Your MCP Servers with Ease</h1>
        <ServerMonitoring />
        <IntegrationTesting />
        <DebuggingTools />
        <AuditLog />
        <ApiDocumentation />
      </main>
    </div>
  );
};

export default Dashboard;