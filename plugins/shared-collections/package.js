Package.describe({
    name: 'omega:meteor-desktop-shared-collections',
    summary: '',
    version: '0.0.1',
    git: 'https://github.com/wojtkowiak/meteor-desktop-shared-collections',
    documentation: 'README.md'
});

Package.onUse(function onUse(api) { // eslint-disable-line prefer-arrow-callback
    api.versionsFrom('METEOR@1.4');
    api.use('ecmascript', 'client');
    api.addFiles('sharedCollections.js', 'client');
});
