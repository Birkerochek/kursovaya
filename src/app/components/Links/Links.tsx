"use client";
import { useSession } from "next-auth/react";
import { Wrapper } from "../Wrapper/Wrapper";
import { StyledLink, NotLink, LinksCont } from "./LinksStyles";
import { use, useEffect } from "react";

const Links = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin" || session?.user?.role === "master";
  console.log("isAdmin", session?.user?.role);
  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
   
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Wrapper>
      <LinksCont>
        <StyledLink href="/pages/catalog">Каталог услуг</StyledLink>
        <StyledLink href="/pages/reviews">Отзывы</StyledLink>
        <NotLink onClick={()=> scrollToFooter()}>Контакты</NotLink>
        {isAdmin && <StyledLink href="/admin">Панель управления</StyledLink>}
      </LinksCont>
    </Wrapper>
  );
};

export default Links;