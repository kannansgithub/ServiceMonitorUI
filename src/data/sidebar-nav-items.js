export default function() {
  return [
    {
      title: "Dashboard",
      to: "/dashboard",
      htmlBefore: '<i class="material-icons">dashboard</i>',
      htmlAfter: ""
    },
    {
      title: "Services",
      htmlBefore: '<i class="material-icons">settings</i>',
      to: "/services"
    },
    {
      title: "Database",
      htmlBefore: '<i class="material-icons">storage</i>',
      to: "/database"
    },
    {
      title: "Web API",
      htmlBefore: '<i class="material-icons">view_module</i>',
      to: "/web-api"
    },
    {
      title: "Servers",
      htmlBefore: '<i class="material-icons">dns</i>',
      to: "/server"
    },
    {
      title: "Forms",
      htmlBefore: '<i class="material-icons">dns</i>',
      to: "/forms"
    }
  ];
}
