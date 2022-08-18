import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

// material-ui
import { jssPreset, StylesProvider } from '@mui/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// project imports

// third-party
import { create } from 'jss';
import rtl from 'jss-rtl';
import rtlPlugin from 'stylis-plugin-rtl';

const jss = create({
    plugins: [...jssPreset().plugins, rtl()]
});

// ==============================|| RTL LAYOUT ||============================== //

const RTLLayout = ({ children }) => {
    const customization = useSelector((state) => state.customization);
    if (customization.rtlLayout) {
        document?.querySelector('html')?.setAttribute('dir', 'rtl');
    } else {
        document?.querySelector('html')?.removeAttribute('dir');
    }
    const cacheRtl = createCache({
        key: customization.rtlLayout ? 'rtl' : 'css',
        prepend: true,
        stylisPlugins: customization.rtlLayout ? [rtlPlugin] : []
    });

    cacheRtl.compat = true;

    return (
        <CacheProvider value={cacheRtl}>
            <StylesProvider jss={jss}>{children}</StylesProvider>
        </CacheProvider>
    );
};

RTLLayout.propTypes = {
    children: PropTypes.node
};

export default RTLLayout;
