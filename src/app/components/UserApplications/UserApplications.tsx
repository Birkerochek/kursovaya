import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import styled from 'styled-components';

const ApplicationsContainer = styled.div`
  margin: 2rem 0;
`;

const ApplicationCard = styled.div`
  background: var(--color-white);
  border: 1px solid var(--color-grey-white);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ApplicationTitle = styled.h3`
  font-family: var(--font-family);
  font-size: 1.2rem;
  color: var(--color-help);
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
      case 'pending': return 'var(--color-pending)';
      case 'approved': return 'var(--color-approved)';
      case 'rejected': return 'var(--color-rejected)';
      default: return 'var(--color-grey-white)';
    }
  }};
  color: var(--color-white);
`;

const ApplicationDetails = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: var(--color-grey);
`;

const NoApplications = styled.p`
  text-align: center;
  color: var(--color-grey);
  font-size: 1.1rem;
  margin: 2rem 0;
`;
interface Application {
  id: number;
  techType: string;
  description: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  master_name?: string;
  master_specialization?: string;
  masters?: {
    name: string;
    specialization: string;
  };
}


const UserApplications = () => {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserApplications = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(
          `/api/applications?userId=${session.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Ошибка при получении заявок");
        }

        const data: Application[] = await response.json();
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
      {
        applications.length === 0 && (
          <NoApplications>Ваша заявка появится тут!</NoApplications>
        )
      }
      {applications.map(app => (
        <ApplicationCard key={app.id}>
          <ApplicationTitle>Номер заявки #{app.id}</ApplicationTitle>
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