import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import i18n from '@i18n';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18n.addResourceBundle('en', 'navigation', en);
i18n.addResourceBundle('tr', 'navigation', tr);
i18n.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		subtitle: 'Command center for quick insights',
		type: 'group',
		icon: 'lucide:house',
		translate: 'DASHBOARD',
		children: [
			{
				id: 'dashboard.project',
				title: 'Project',
				type: 'item',
				icon: 'lucide:clipboard-check',
				url: '/dashboard/project'
			},
			{
				id: 'dashboard.analytics',
				title: 'Analytics',
				type: 'item',
				icon: 'lucide:chart-pie',
				url: '/dashboard/analytics'
			},
			{
				id: 'dashboard.finance',
				title: 'Finance',
				type: 'item',
				icon: 'lucide:banknote',
				url: '/dashboard/finance'
			},
			{
				id: 'dashboard.overview',
				title: 'Overview',
				type: 'item',
				icon: 'lucide:layout-dashboard',
				url: '/dashboard/overview'
			},
			{
				id: 'dashboard.activity',
				title: 'Activity',
				type: 'item',
				icon: 'lucide:activity',
				url: '/dashboard/activity'
			}
		]
	},
	{
		id: 'portfolios',
		title: 'Portfolios',
		subtitle: 'Manage and track your investments',
		type: 'group',
		icon: 'lucide:briefcase',
		translate: 'PORTFOLIOS',
		children: [
			{
				id: 'portfolios.accounts',
				title: 'Accounts',
				type: 'item',
				icon: 'lucide:wallet',
				url: '/portfolios/accounts'
			},
			{
				id: 'portfolios.holdings',
				title: 'Holdings',
				type: 'item',
				icon: 'lucide:package',
				url: '/portfolios/holdings'
			},
			{
				id: 'portfolios.transactions',
				title: 'Transactions',
				type: 'item',
				icon: 'lucide:arrow-left-right',
				url: '/portfolios/transactions'
			},
			{
				id: 'portfolios.connections',
				title: 'Connections',
				type: 'item',
				icon: 'lucide:link',
				url: '/portfolios/connections'
			},
			{
				id: 'portfolios.optimization',
				title: 'Optimization',
				type: 'item',
				icon: 'lucide:sliders-horizontal',
				url: '/portfolios/optimization'
			}
		]
	},
	{
		id: 'analytics',
		title: 'Analytics',
		subtitle: 'In-depth insights and data analysis',
		type: 'group',
		icon: 'lucide:trending-up',
		translate: 'ANALYTICS',
		children: [
			{
				id: 'analytics.exposures',
				title: 'Exposures',
				type: 'item',
				icon: 'lucide:chart-pie',
				url: '/analytics/exposures'
			},
			{
				id: 'analytics.performance',
				title: 'Performance',
				type: 'item',
				icon: 'lucide:chart-area',
				url: '/analytics/performance'
			},
			{
				id: 'analytics.risk',
				title: 'Risk',
				type: 'item',
				icon: 'lucide:shield',
				url: '/analytics/risk'
			},
			{
				id: 'analytics.insights',
				title: 'Insights',
				type: 'item',
				icon: 'lucide:brain',
				url: '/analytics/insights'
			}
		]
	},
	{
		id: 'monitoring',
		title: 'Monitoring',
		subtitle: 'Keep track of alerts and reports',
		type: 'group',
		icon: 'lucide:eye',
		translate: 'MONITORING',
		children: [
			{
				id: 'monitoring.alerts',
				title: 'Alerts',
				type: 'item',
				icon: 'lucide:bell',
				url: '/monitoring/alerts'
			},
			{
				id: 'monitoring.reports',
				title: 'Reports',
				type: 'item',
				icon: 'lucide:file-text',
				url: '/monitoring/reports'
			}
		]
	}
];

export default navigationConfig;
