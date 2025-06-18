import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
	title: string;
	value: string | number;
	icon: LucideIcon;
	trend?: {
		value: number;
		isPositive: boolean;
	};
	description?: string;
	className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
	title,
	value,
	icon: Icon,
	trend,
	description,
	className = ''
}) => {
	return (
		<div className={`bg-card border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
			<div className="flex items-center justify-between">
				<div className="flex-1">
					<div className="flex items-center space-x-2 mb-2">
						<div className="p-2 bg-primary/10 rounded-lg">
							<Icon className="h-5 w-5 text-primary" />
						</div>
						<h3 className="text-sm font-medium text-muted-foreground">
							{title}
						</h3>
					</div>
					
					<div className="space-y-1">
						<p className="text-2xl font-bold text-foreground">
							{value}
						</p>
						
						{trend && (
							<div className="flex items-center space-x-1">
								<span className={`text-sm font-medium ${
									trend.isPositive ? 'text-green-600' : 'text-red-600'
								}`}>
									{trend.isPositive ? '+' : ''}{trend.value}%
								</span>
								<span className="text-xs text-muted-foreground">
									vs. período anterior
								</span>
							</div>
						)}
						
						{description && (
							<p className="text-xs text-muted-foreground">
								{description}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default MetricCard;
