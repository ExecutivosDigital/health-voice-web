export interface PagesProps {
  title: string;
  icon: string;
  route: string;
}

export const Pages = [
  {
    title: "Home",
    icon: "home",
    route: "/",
  },
  {
    title: "Analytics",
    icon: "analytics",
    route: "#",
  },
  {
    title: "Cursos",
    icon: "courses",
    route: "/courses",
  },
  {
    title: "Modelos",
    icon: "placeholder",
    route: "/models",
  },
  {
    title: "Administrativo",
    icon: "placeholder",
    route: "/admin",
  },
  {
    title: "Testar IA",
    icon: "placeholder",
    route: "/chat",
  },
];
