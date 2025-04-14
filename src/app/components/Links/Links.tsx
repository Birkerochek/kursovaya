"use client";
import { useSession } from "next-auth/react";
import { Wrapper } from "../Wrapper/Wrapper";
import { StyledLink, NotLink, LinksCont } from "./LinksStyles";

const Links = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  return (
    <Wrapper>
      <LinksCont>
        <StyledLink href="/pages/catalog">Каталог услуг</StyledLink>
        <NotLink>О компании</NotLink>
        <StyledLink href="/pages/reviews">Отзывы</StyledLink>
        <NotLink>Контакты</NotLink>
        {isAdmin && <StyledLink href="/pages/admin">Админка</StyledLink>}
      </LinksCont>
    </Wrapper>
  );
};

export default Links;