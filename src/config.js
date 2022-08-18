const config = {
    // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
    // like '/berry-material-react/react/default'
    basename: '',
    defaultPath: '/',
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 12,
    outlinedFilled: true,
    theme: 'light', // light, dark
    presetColor: 'default', // default, theme1, theme2, theme3, theme4, theme5, theme6
    i18n: 'en', // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
    rtlLayout: false,
    jwt: {
        secret: 'SECRET-KEY',
        timeout: '1 days'
    },
    firebase: {
        apiKey: 'AIzaSyBernKzdSojh_vWXBHt0aRhf5SC9VLChbM',
        authDomain: 'berry-material-react.firebaseapp.com',
        projectId: 'berry-material-react',
        storageBucket: 'berry-material-react.appspot.com',
        messagingSenderId: '901111229354',
        appId: '1:901111229354:web:a5ae5aa95486297d69d9d3',
        measurementId: 'G-MGJHSL8XW3'
    },
    auth0: {
        client_id: '7T4IlWis4DKHSbG8JAye4Ipk0rvXkH9V',
        domain: 'dev-w0-vxep3.us.auth0.com'
    },
    base_url : 'https://api-pandora.lol/V1'
};

export default config;
