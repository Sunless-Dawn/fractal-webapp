export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Gifs That Go Hard",
	description: "The NFTs that make you trip",
	navItems: [
		{
			label: "Home",
			href: "/",
		},
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "About",
      href: "/about",
    }
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/Sunless-Dawn",
		twitter: "https://twitter.com/SunlessDawnNFT",
		docs: "https://nextui-docs-v2.vercel.app",
		discord: "https://discord.gg/DmQu2qZr",
    sponsor: "https://etherscan.io/address/0xb445e1c6fc5debd141dd6c52653dcaabe839eb5e"
	},
};
