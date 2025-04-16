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
  const onStatusChangeHandler = async (applicationId: number, newStatus: "pending" | "approved" | "rejected"): Promise<any> => {
    const result = await handleStatusChange(applicationId, newStatus);
    return result;
  };
  const wrappedHandleAssign = async (id: number, masterId: number) => {
    await handleAssignMaster(id, masterId);
  };

  useEffect(() => {
    fetchApplications();
    fetchMasters();
  }, []);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  

  return (
    <Wrapper>
      <AdminContainer>
        <div>
          <ApplicationsList
            applications={applications}
            masters={masters}
            onStatusChange={onStatusChangeHandler}
            onAssignMaster={wrappedHandleAssign}
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
