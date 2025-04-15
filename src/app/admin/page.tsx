"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useApplications } from "./hooks/useApplications";
import { useMasters } from "./hooks/useMasters";
import { ApplicationsList } from "./components/ApplicationsList";
import MainBackButton from "@/app/UI/MainBackButton";
import UserManagement from "./components/UserManagement";
import styled from "styled-components";
import { Wrapper } from "../components/Wrapper/Wrapper";

const AdminContainer = styled.div`
display:flex;

`

export default function AdminPage() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const router = useRouter();

  const {
    applications,
    loading,
    fetchApplications,
    handleStatusChange,
    handleAssignMaster,
    handleDeleteApplication,
  } = useApplications();

  const { masters, fetchMasters } = useMasters();



  useEffect(() => {
    fetchApplications();
    fetchMasters();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  

  return (
    <Wrapper>
      <MainBackButton />
      <AdminContainer>
        <div>
          <ApplicationsList
            applications={applications}
            masters={masters}
            onStatusChange={handleStatusChange}
            onAssignMaster={handleAssignMaster}
            onDelete={handleDeleteApplication}
            loading={loading}
          />
        </div>
        {isAdmin &&
        <div>
          <UserManagement />
        </div>
        }
      </AdminContainer>
    </Wrapper>
  );
}
