import React from 'react';
import './Footer.scss';

const Footer = () => (
    <footer className="app-footer">
        © {new Date().getFullYear()} CVO &amp; SUNGZ's Cookbook
    </footer>
);

export default Footer;
