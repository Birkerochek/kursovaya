"use client";
import { useSession } from "next-auth/react";
import { Wrapper } from "../Wrapper/Wrapper";
import { StyledLink, NotLink, LinksCont } from "./LinksStyles";
import { use, useEffect } from "react";

const Links = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin" || session?.user?.role === "master";
  console.log("isAdmin", session?.user?.role);
  const scrollToFeedbackForm = () => {
    const aboutUs = document.getElementById("aboutUs");
    const footer = document.getElementById("footer");
    if (aboutUs) {
      aboutUs.scrollIntoView({ behavior: "smooth" });
    }
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Wrapper>
      <LinksCont>
        <StyledLink href="/pages/catalog">Каталог услуг</StyledLink>
        <NotLink onClick={()=> scrollToFeedbackForm()}>О компании</NotLink>
        <StyledLink href="/pages/reviews">Отзывы</StyledLink>
        <NotLink onClick={()=> scrollToFeedbackForm()}>Контакты</NotLink>
        {isAdmin && <StyledLink href="/admin">Панель управления</StyledLink>}
      </LinksCont>
    </Wrapper>
  );
};

export default Links;