"use client";
import React from 'react';
import Image from 'next/image';
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { 
  FooterContainer, 
  FooterContent, 
  FooterSection, 
  FooterLink,
  SocialLinks,
  SocialIcon,
  FooterBottom 
} from './FooterStyles';

const Footer = () => {
  return (
    <FooterContainer id='footer'>
      <FooterContent>
        <FooterSection>
          <Image src="/logo.svg" alt="RemTopia Logo" width={180} height={60} />
          <p>
            Починим ваши продукты за считанные дни и без особых затрат!.
          </p>
          <SocialLinks>
            <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="https://t.me" target="_blank" rel="noopener noreferrer">
              <FaTelegramPlane />
            </SocialIcon>
            <SocialIcon href="https://wa.me/89514569595" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </SocialIcon>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>Контакты</h3>
          <p>Телефон: +7 (951) 456-95-95</p>
          <p>Email: kursovaya@mail.ru</p>
          <p>Адрес: г. Челябинск, ул. Энтузиастов, д. 17</p>
          <p>Время работы: 6:30 - 21:00</p>
        </FooterSection>

        <FooterSection>
          <h3>Навигация</h3>
          <FooterLink href="/">Главная</FooterLink>
          <FooterLink href="/pages/catalog">Услуги</FooterLink>
          <FooterLink href="/pages/reviews">Отзывы</FooterLink>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>© {new Date().getFullYear()} RemTopia. Все права защищены.</p>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;