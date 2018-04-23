/* eslint-disable no-underscore-dangle, no-console */
if (Meteor.isDesktop) {
    Desktop.sharedCollections = {};

    Desktop.on('collections', 'insert', (event, fetchId, name, document) => {
        console.log('insert', name);
        Desktop.sharedCollections[name].insert(document, (error, id) => {
            console.log(error, id);
            Desktop.respond('collections', 'insert', fetchId, [error, id]);

        });
    });

    Desktop.shareCollection = function(collection) {
        Desktop.sharedCollections[collection._name] = collection;
        Desktop.fetch('collections', 'shareCollection', undefined, collection._name)
            .then(result => {console.log(result);});
    };

}
