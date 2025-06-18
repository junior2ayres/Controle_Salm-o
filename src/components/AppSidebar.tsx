import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
	BarChart3, 
	FileText, 
	Search, 
	Settings, 
	TrendingUp, 
	Users, 
	ClipboardList,
	Home,
	Menu,
	X
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

interface AppSidebarProps {
	isOpen: boolean;
	onToggle: () => void;
}

const AppSidebar: React.FC<AppSidebarProps> = ({ isOpen, onToggle }) => {
	const location = useLocation();

	return (
		<>
			{/* Overlay para mobile */}
			{isOpen && (
				<div 
					className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
					onClick={onToggle}
				/>
			)}

			{/* Sidebar */}
			<aside className={`fixed left-0 top-0 z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out lg:translate-x-0 ${
				isOpen ? 'translate-x-0' : '-translate-x-full'
			}`}>
				<div className="flex h-full flex-col">
					{/* Header */}
					<div className="flex h-16 items-center justify-between border-b border-sidebar-border bg-sidebar-primary px-4">
						<h1 className="text-xl font-bold text-sidebar-primary-foreground">
							Controle Salmão
						</h1>
						<button
							onClick={onToggle}
							className="lg:hidden p-2 text-sidebar-primary-foreground hover:bg-sidebar-accent rounded-md"
						>
							<X className="h-5 w-5" />
						</button>
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
									onClick={() => {
										// Fecha o menu no mobile ao clicar em um item
										if (window.innerWidth < 1024) {
											onToggle();
										}
									}}
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
		</>
	);
};

export default AppSidebar;
