// import { useState, useEffect } from "react";
// import { Link } from "wouter";

// function Header() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [showHeaderBackground, setShowHeaderBackground] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const shouldShowBackground = window.scrollY > 0;
//       setShowHeaderBackground(shouldShowBackground);
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       {showHeaderBackground && <div className="headerBackground"></div>}
//       <div className={`header ${menuOpen ? "open" : ""}`}>
//         <Link href="/">
//           Workout App <img src="images/blog-icon.svg" alt="App Icon" />
//         </Link>
//         <div className="menuIcon" onClick={() => setMenuOpen(true)}>
//           ☰
//         </div>
//         <div className="menuMask" onClick={() => setMenuOpen(false)}></div>
//         <div className="closeMenuIcon" onClick={() => setMenuOpen(false)}>
//           ☒
//         </div>
//         <ul className={`menuNav ${menuOpen ? "open" : ""}`}>
//           <li>
//             <Link href="/" onClick={() => setMenuOpen(false)}>
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link href="/exercises" onClick={() => setMenuOpen(false)}>
//               All Exercises
//             </Link>
//           </li>
//           <li>
//             <Link href="/myroutine" onClick={() => setMenuOpen(false)}>
//               Routines
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </>
//   );
// }

// export default Header;

import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";

function Header() {
  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      url: "http://localhost:5173/",
    },
    {
      label: "All Exercises",
      icon: "pi pi-star",
      url: "http://localhost:5173/exercises",
    },
    {
      label: "Workouts",
      icon: "pi pi-search",
      items: [
        {
          label: "Monday",
          icon: "pi pi-bolt",
          shortcut: "⌘+S",
          template: itemRenderer,
        },
        {
          label: "Tuesday",
          icon: "pi pi-server",
          shortcut: "⌘+B",
          template: itemRenderer,
        },
        {
          label: "Chest & Triceps",
          icon: "pi pi-pencil",
          shortcut: "⌘+U",
          template: itemRenderer,
        },
        {
          separator: true,
        },
        {
          label: "Back & Biceps",
          icon: "pi pi-palette",
          items: [
            {
              label: "Biceps Curls",
              icon: "pi pi-palette",
              badge: 2,
              template: itemRenderer,
            },
            {
              label: "Pull ups",
              icon: "pi pi-palette",
              badge: 3,
              template: itemRenderer,
            },
          ],
        },
      ],
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
      badge: 3,
      template: itemRenderer,
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      />
      <Button
        label="Sign in"
        size="small"
        onClick={() => {
          window.location.href = "/sign-in";
        }}
      />
      <Button
        label="Sign up"
        severity="secondary"
        size="small"
        link
        text
        onClick={() => {
          window.location.href = "/sign-up";
        }}
      />
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}

export default Header;
