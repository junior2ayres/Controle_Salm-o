import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
	BarChart3, 
	FileText, 
	Search, 
	Settings, 
	TrendingUp, 
	Users, 
	ClipboardList,
	Home
} from 'lucide-react';

interface SidebarItem {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	path: string;
}

const sidebarItems: SidebarItem[] = [
	{ icon: Home, label: 'Início', path: '/' },
	{ icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
	{ icon: ClipboardList, label: 'Preenchimento', path: '/preenchimento' },
	{ icon: Search, label: 'Consultas', path: '/consultas' },
	{ icon: TrendingUp, label: 'Métricas', path: '/metricas' },
	{ icon: FileText, label: 'Relatórios', path: '/relatorios' }
];

const AppSidebar: React.FC = () => {
	const location = useLocation();

	return (
		<aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out">
			<div className="flex h-full flex-col">
				{/* Header */}
				<div className="flex h-16 items-center justify-center border-b border-sidebar-border bg-sidebar-primary">
					<h1 className="text-xl font-bold text-sidebar-primary-foreground">
						Controle Salmão
					</h1>
				</div>

				{/* Navigation */}
				<nav className="flex-1 space-y-1 p-4">
					{sidebarItems.map((item) => {
						const Icon = item.icon;
						const isActive = location.pathname === item.path;
						
						return (
							<Link
								key={item.path}
								to={item.path}
								className={`sidebar-item flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
									isActive 
										? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-md' 
										: 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
								}`}
							>
								<Icon className={`h-5 w-5 ${isActive ? 'text-sidebar-primary-foreground' : 'text-sidebar-foreground'}`} />
								<span>{item.label}</span>
							</Link>
						);
					})}
				</nav>

				{/* Footer */}
				<div className="border-t border-sidebar-border p-4">
					<div className="text-xs text-sidebar-foreground/60 text-center">
						© 2024 Sistema de Controle
					</div>
				</div>
			</div>
		</aside>
	);
};

export default AppSidebar;
