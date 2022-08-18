// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconBrandChrome, IconHelp, IconSitemap, IconHome } from '@tabler/icons';

// constant
const icons = {
    IconBrandChrome,
    IconHelp,
    IconSitemap,
    IconUserCheck,
    IconHome

};

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: <FormattedMessage id="dashboard" />,
            type: 'collapse',
            icon: icons.IconHome,
            children: [
                {
                    id: 'new_order',
                    title: <FormattedMessage id="new_order" />,
                    type: 'item',
                    url: '/'
                },
                {
                    id: 'orders_history',
                    title: <FormattedMessage id="orders_history" />,
                    type: 'item',
                    url: '/orders_history'
                },

            ]
        },
    ]
};

export default other;
