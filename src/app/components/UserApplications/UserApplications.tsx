import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';
import { supabase } from '../supabaseClient';

const ApplicationsContainer = styled.div`
  margin: 2rem 0;
`;

const ApplicationCard = styled.div`
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ApplicationTitle = styled.h3`
  font-family: var(--font-family);
  font-size: 1.2rem;
  color: #1b3764;
  margin: 0 0 1rem 0;
`;

const ApplicationStatus = styled.span<{ status: string }>`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.9rem;
  margin-left: 1rem;
  background-color: ${props => {
    switch (props.status) {
      case 'pending': return '#ff9800';
      case 'approved': return '#4caf50';
      case 'rejected': return '#f44336';
      default: return '#e0e0e0';
    }
  }};
  color: ${props => props.status === 'pending' ? '#000' : '#fff'};
`;

const ApplicationDetails = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: #333;
`;

const NoApplications = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  margin: 2rem 0;
`;

interface Application {
  id: number;
  techType: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  master_id: number | null;
  master_name?: string;
  master_specialization?: string;
}

const UserApplications = () => {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserApplications = async () => {
      if (!session?.user?.id) return;

      try {
        const { data, error } = await supabase
          .from('applications')
          .select(`
            *,
            masters (
              name,
              specialization
            )
          `)
          .eq('user_id', session.user.id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) throw error;
        
        const formattedData = data?.map(app => ({
          ...app,
          master_name: app.masters?.name,
          master_specialization: app.masters?.specialization
        })) || [];
        
        setApplications(formattedData);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserApplications();
  }, [session]);

  if (loading) return null;
  if (!session?.user) return null;
  if (applications.length === 0) return null;

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'В обработке';
      case 'approved': return 'Одобрено';
      case 'rejected': return 'Отклонено';
      default: return status;
    }
  };

  return (
    <ApplicationsContainer>
      {applications.map(app => (
        <ApplicationCard key={app.id}>
          <ApplicationTitle>
            {app.techType}
            <ApplicationStatus status={app.status}>
              {getStatusText(app.status)}
            </ApplicationStatus>
          </ApplicationTitle>
          <ApplicationDetails>
            <p>{app.description}</p>
            {app.master_name && (
              <p>Назначенный мастер: {app.master_name} ({app.master_specialization})</p>
            )}
            <p>Дата создания: {new Date(app.created_at).toLocaleDateString('ru-RU')}</p>
          </ApplicationDetails>
        </ApplicationCard>
      ))}
    </ApplicationsContainer>
  );
};

export default UserApplications;