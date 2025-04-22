"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useApplications } from "./hooks/useApplications";
import { useMasters } from "./hooks/useMasters";
import styled from "styled-components";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { StyledLink } from "../components/Links/LinksStyles";
import { ApplicationsList } from "./components/ApplicationsList/ApplicationsList";
import { TitlesAdmin } from "./components/StyledComponents";
import { Typography } from "@mui/material";

const AdminContainer = styled.div`
`
export default function AdminPage() {
  const { data: session, status } = useSession();
  const isAdmin = session?.user?.role === "admin";
  console.log(session?.user?.role)
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
        <TitlesAdmin>
                <Typography variant="h4" component="h1" gutterBottom>
                  Управление заявками
                </Typography>
          
          {isAdmin &&
          <div>
            <StyledLink href={"/admin/users"}>Управление пользователями</StyledLink>
          </div>
          }
        </TitlesAdmin>
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
      </AdminContainer>
    </Wrapper>
  );
}
