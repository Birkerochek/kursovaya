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

const AdminContainer = styled.div`
display:grid;
grid-template-columns: 2fr 1fr;
gap: 20px;
`

export default function AdminPage() {
  const { data: session, status } = useSession();
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
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/");
    }
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, session, router]);

  useEffect(() => {
    fetchApplications();
    fetchMasters();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session?.user?.role !== "admin") {
    return null;
  }

  return (
    <div>
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
        <div>
          <UserManagement />
        </div>
      </AdminContainer>
    </div>
  );
}
